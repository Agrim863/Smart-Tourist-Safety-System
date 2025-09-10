"use client";
import React, { useState } from "react";
import { parse } from "passport-mrz";
import { supabase } from "../supabaseClient";

export default function MRZScanner({ user }) {
  const [mrzText, setMrzText] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle MRZ text input
  const handleMRZChange = (e) => {
    setMrzText(e.target.value);
  };

  // Parse MRZ string
  const handleParse = () => {
    try {
      const results = parse(mrzText.split("\n")); // takes MRZ lines
      setParsedData(results.fields);
    } catch (err) {
      alert("Failed to parse MRZ. Please check input.");
    }
  };

  // Handle selfie upload
  const handleSelfieUpload = async (e) => {
    const file = e.target.files[0];
    setSelfie(file);
  };

  // Save to Supabase
  const handleSave = async () => {
    if (!parsedData || !selfie) {
      alert("MRZ + Selfie required");
      return;
    }
    setLoading(true);

    try {
      // Upload selfie
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("selfies")
        .upload(`${user.id}.jpg`, selfie, { upsert: true });

      if (uploadError) throw uploadError;

      const selfieUrl = supabase.storage
        .from("selfies")
        .getPublicUrl(`${user.id}.jpg`).data.publicUrl;

      // Insert/update profile
      const { error: dbError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: parsedData.firstName + " " + parsedData.lastName,
        passport_number: parsedData.documentNumber,
        nationality: parsedData.nationality,
        date_of_birth: parsedData.birthDate,
        expiry_date: parsedData.expirationDate,
        selfie_url: selfieUrl,
      });

      if (dbError) throw dbError;

      alert("Profile saved successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Passport MRZ + Selfie</h2>

      <textarea
        placeholder="Paste MRZ here (2 or 3 lines)"
        value={mrzText}
        onChange={handleMRZChange}
        className="w-full border p-2 mb-2"
      />

      <button onClick={handleParse} className="bg-blue-600 text-white px-4 py-2 rounded">
        Parse MRZ
      </button>

      {parsedData && (
        <div className="mt-3">
          <p><b>Name:</b> {parsedData.firstName} {parsedData.lastName}</p>
          <p><b>Passport No:</b> {parsedData.documentNumber}</p>
          <p><b>Nationality:</b> {parsedData.nationality}</p>
          <p><b>DOB:</b> {parsedData.birthDate}</p>
          <p><b>Expiry:</b> {parsedData.expirationDate}</p>
        </div>
      )}

      <div className="mt-3">
        <label className="block">Upload Selfie</label>
        <input type="file" accept="image/*" onChange={handleSelfieUpload} />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
