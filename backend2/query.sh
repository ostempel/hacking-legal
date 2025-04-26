#!/bin/bash

# Static values
UUID="0eff34ac-3dae-4431-9175-cca78894e0a8"
QUERY="Who is the appellant and appelee in the tyree d. johnson v. state of arkansas case?"
URL="http://localhost:8000"

# Make the query
curl -X POST \
     -H "Content-Type: application/json" \
     -d "{\"uuid\": \"$UUID\", \"query\": \"$QUERY\"}" \
     "$URL/query" | json_pp
