import React, { useEffect, useState } from "react";
import axios from "axios";

const DocumentViewer = ({ dealId, token }) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await axios.get(`http://localhost:5008/api/documents/${dealId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(res.data);
    };

    fetchDocs();
  }, [dealId, token]);

  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2">Documents</h2>
      {documents.map((doc) => (
        <div key={doc._id} className="flex justify-between items-center mb-2">
          <span>{doc.fileName}</span>
          <a
             href={`http://localhost:5008/api/documents/download/${doc.fileUrl}`}

            // href={`http://localhost:5008/api/documents/download/${doc.fileUrl.split("/").pop()}`}
            // href={`http://localhost:5008/api/documents/download/${doc.fileUrl.split("/")[1]}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentViewer;
