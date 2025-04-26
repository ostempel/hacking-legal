#!/bin/bash

# Static values
UUID="0eff34ac-3dae-4431-9175-cca78894e0a8"
QUERY="tyree d. johnson v. state of arkansas"
URL="http://localhost:8000"

# Make the query and store the response
echo "Making query to analyze case: $QUERY"
echo "Using UUID: $UUID"
echo -e "\nResponse:"
curl -X POST \
     -H "Content-Type: application/json" \
     -d "{\"uuid\": \"$UUID\", \"query\": \"$QUERY\"}" \
     "$URL/query" | python3 -m json.tool
