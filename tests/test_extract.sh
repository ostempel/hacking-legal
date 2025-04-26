#!/bin/bash

# Test the /extract endpoint with a sample legal text
echo "Testing /extract endpoint..."

curl -X POST http://localhost:8000/extract \
  -H "Content-Type: application/json" \
  -d '{
    "text": "**1. Who is the defendant and plaintiff?** The defendant (appellant) is Jake Holmes, and the plaintiff (appellee) is Michael Zangari, representing the State of Arkansas."
  }' | jq '.'

echo "Test completed." 