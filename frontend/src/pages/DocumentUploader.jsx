import React, { useState } from "react";
import axios from "axios";

const DocumentUploader = ({ dealId, token }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("document", file);
    formData.append("dealId", dealId);
    formData.append("allowedRoles", JSON.stringify(["buyer", "seller"]));

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/documents/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type" header is not needed, axios handles it automatically
        },
      });
      console.log("Upload Success ✅", res.data);
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error("Upload Failed ❌", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Upload failed");
    }
  };

  return (
    <div>
      <h3>📄 Upload Document</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept=".pdf,.docx,.jpg,.png,.jpeg" // Optionally restrict file types
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUploader;
