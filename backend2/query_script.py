import requests
import argparse
import json

def query_documents(uuid: str, query: str, url: str = "http://localhost:8000"):
    """
    Query documents in a specific UUID directory.
    
    Args:
        uuid (str): The UUID of the upload directory to query
        query (str): The query to ask about the documents
        url (str): The base URL of the API server
    """
    endpoint = f"{url}/query"
    
    payload = {
        "uuid": uuid,
        "query": query
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(endpoint, json=payload, headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        result = response.json()
        print("\nResponse:")
        print(json.dumps(result, indent=2))
        
    except requests.exceptions.RequestException as e:
        print(f"\nError occurred: {str(e)}")
        if hasattr(e.response, 'text'):
            print(f"Server response: {e.response.text}")

def main():
    parser = argparse.ArgumentParser(description="Query documents in a specific UUID directory")
    parser.add_argument("uuid", help="UUID of the upload directory to query")
    parser.add_argument("query", help="Query to ask about the documents")
    parser.add_argument("--url", default="http://localhost:8000", help="Base URL of the API server")
    
    args = parser.parse_args()
    
    query_documents(args.uuid, args.query, args.url)

if __name__ == "__main__":
    main() 