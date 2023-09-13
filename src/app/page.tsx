"use client";

import { gql } from "@/__generated__/gql";
import { initializeApollo } from "@/lib/apolloClient";
import { ApolloQueryResult } from "@apollo/client";
import { useState, useEffect } from "react";

export default function Home() {
  const [results, setResults] = useState<ApolloQueryResult<any> | null>(null);

  useEffect(() => {
    const apolloClient = initializeApollo();

    apolloClient
      .query({
        query: gql(`
          query demo {
            country(code: "BR") {
              name
              native
              capital
              emoji
              currency
              languages {
                code
                name
              }
            }
          }
      `),
      })
      .then((result) => {
        setResults(result);
      });
  }, []);

  return <pre>{JSON.stringify(results, null, 2)}</pre>;
}
