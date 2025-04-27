# Hacking-Legal | Die Paragrafenbändiger

The “Paragrafenbändiger” is an innovative analysis and case management tool that supports both lawyers and other employees involved in cases within a company. The aim is to make the processing of complex legal cases more efficient and structured. The tool offers intelligent functions for analyzing large volumes of evidence and other documents, automatically recognizes important content from documents and inconsistencies, and helps to identify weaknesses and risks in the evidence at an early stage. In addition, the “Paragrafenbändiger” creates concise case studies that summarize the strengths and weaknesses of a case and suggest various strategy options. 

The “Paragrafenbändiger” provides lawyers with a comprehensive dashboard with full access to analysis, strategy and case management functions. In addition, when a document is opened, the “Paragrafenbändiger”  provides an AI-powered analysis function that automatically provides summaries, relevant key information and initial usage suggestions. It automatically recognizes relevant jurisdictions, assigns cases to the appropriate areas of law and supports the processing of cross-border issues. In document management, users can easily upload files, assign them to existing cases and sort them by case, date or alphabet. Uploaded documents are directly visible in case management. 

Other employees - for example from production, the sales or the compliance department - have a specially customized dashboard. They can report new cases or upload documents on existing cases. After reporting a case, they receive direct instructions on how the case needs to be processed internally. The user role is permanently assigned when the profile is created and can only be changed by an administrator to prevent data protection violations. Strict access control, complete logging of all activities and GDPR-compliant data processing ensure maximum security and transparency.

In terms of technology, the Frontend of the ”Paragrafenbändiger” is based on 
V0 (reactnext.js, TailwindCSS) and the Backend on Ollama. 

The ”Paragrafenbändiger” is a powerful platform that efficiently integrates both lawyers and other company departments into case processing, simplifies collaboration and at the same time meets the highest standards of security, traceability and legal compliance.

## Architecture documentation

![Architecture Diagram](https://github.com/ostempel/hacking-legal/raw/main/docs/architecture.drawio.png)

## Vision

Technical Improvements:
    - Authentication & Authorization
    - move from file-handling to vector-database
    - add ingestion-pipline which handles pdf upload -> extract text -> chunking -> generate embeddings -> store to vector database
    - AI-Agent RAG-Pipeline: retrive current case -> search relevant cases -> analyze based on context
    - provide case chat-bot
  
Organisational Improvements:
    - adjust UI to lawyer workflows
    - streamline whole process
    - discuss with legal departments about gdpr and privacy issues