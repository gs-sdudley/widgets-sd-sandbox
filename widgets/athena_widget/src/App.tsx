import { useState, useEffect } from "react";
import type { WidgetSDK, WidgetProps } from "./types";
import {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  QueryExecutionState,
  Row,
  Datum,
} from "@aws-sdk/client-athena";


async function runAthenaQuery(props: WidgetProps,client: AthenaClient,sql: string): Promise<Row[]> {
  // 1. Start the query
  const startResponse = await client.send(
    new StartQueryExecutionCommand({
      QueryString: sql,                          // required: your SQL
    //   QueryExecutionContext: {
    //     Database: "my_database",                 // optional: target DB
    //     Catalog: "AwsDataCatalog",               // optional: data catalog
    //   },
      ResultConfiguration: {
        OutputLocation: `s3://${props.AWSBucket}/athena-results/`, // where to store results
      },
    //  WorkGroup: "primary",                      // optional: workgroup name
    })
  );

  const queryExecutionId = startResponse.QueryExecutionId!;
  console.log("Query started:", queryExecutionId);

  // 2. Poll until the query completes
  let state: string | undefined;
  do {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1s between polls

    const statusResponse = await client.send(
      new GetQueryExecutionCommand({ QueryExecutionId: queryExecutionId })
    );
    state = statusResponse.QueryExecution?.Status?.State;
    console.log("Query state:", state);
  } while (state === QueryExecutionState.RUNNING || state === QueryExecutionState.QUEUED);

  if (state !== QueryExecutionState.SUCCEEDED) {
    const reason = /* get failure reason */ "Query failed with state: " + state;
    throw new Error(reason);
  }

  // 3. Fetch the results
  const resultsResponse = await client.send(
    new GetQueryResultsCommand({ QueryExecutionId: queryExecutionId })
  );

  const rows = resultsResponse.ResultSet?.Rows ?? [];
//  console.log("Results:", rows);
  return rows;
}




export function App({ sdk }: { sdk: WidgetSDK }) {
    const [props, setProps] = useState<WidgetProps>(sdk.getProps());
    const [queryData, setQueryData] = useState<Row[]>([]);
    const client = new AthenaClient({ region: (props.AWSRegion || "us-west-1") as string });
    
    useEffect(() => sdk.on("propsChanged", setProps), [sdk]);

    useEffect(() => {
      runAthenaQuery(props, client, "SELECT title FROM topics LIMIT 10").then(setQueryData);
    }, []);



  return (
    <section className="react-widget-section">
      <h3 className="react-widget-title">Athena Data</h3>
      <ul>
        {queryData.map((row: Row, i: number) => (
          <li key={i}>{row.Data?.map((d: Datum) => d.VarCharValue).join(", ")}</li>
        ))}
      </ul>
    </section>
  );
}