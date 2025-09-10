"use client";

import { useState } from "react";
import { supabase } from "@/src/supabaseClient";
import Tesseract from "tesseract.js";
import { parse } from "mrz";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [mrzFile, setMrzFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Extract MRZ data using OCR + parser
  const handleMrzUpload = async () => {
    if (!mrzFile) return;
    setLoading(true);
    try {
      const { data: ocr } = await Tesseract.recognize(mrzFile, "eng");
      const text = ocr.text.replace(/\s+/g, "");
      console.log("MRZ Text:", text);

      const results = parse(text);
      if (results && results.fields) {
        const fields = results.fields as Record<string, string | null>;

        setName(
          [fields.firstName, fields.lastName].filter(Boolean).join(" ")
        );
        setPassportNumber(fields.documentNumber || "");
        setNationality(fields.nationality || "");
        setDob(fields.dateOfBirth || "");
      }
    } catch (err) {
      console.error("MRZ parse failed", err);
    }
    setLoading(false);
  };

  // 🔹 Save Profile
  const handleSave = async () => {
    setLoading(true);
    let selfieUrl = null;

    if (selfieFile) {
      const { data, error } = await supabase.storage
        .from("selfies")
        .upload(`selfie-${Date.now()}.jpg`, selfieFile);
      if (error) console.error("Selfie upload error:", error);
      else selfieUrl = data.path;
    }

    const { error } = await supabase.from("profiles").upsert({
      name,
      passport_number: passportNumber,
      nationality,
      dob,
      emergency_contact: emergencyContact,
      selfie_url: selfieUrl,
    });

    if (error) console.error("Save failed:", error);
    else alert("Profile saved!");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <input
        type="text"
        placeholder="Full Name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Passport Number"
        className="border p-2 w-full"
        value={passportNumber}
        onChange={(e) => setPassportNumber(e.target.value)}
      />

      <input
        type="text"
        placeholder="Nationality"
        className="border p-2 w-full"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <input
        type="text"
        placeholder="Emergency Contact"
        className="border p-2 w-full"
        value={emergencyContact}
        onChange={(e) => setEmergencyContact(e.target.value)}
      />

      {/* MRZ Upload */}
      <div>
        <label className="block font-semibold">Upload Passport MRZ</label>
        <input type="file" onChange={(e) => setMrzFile(e.target.files?.[0] || null)} />
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
          onClick={handleMrzUpload}
          disabled={!mrzFile || loading}
        >
          {loading ? "Processing..." : "Extract MRZ"}
        </button>
      </div>

      {/* Selfie Upload */}
      <div>
        <label className="block font-semibold">Upload Selfie</label>
        <input type="file" onChange={(e) => setSelfieFile(e.target.files?.[0] || null)} />
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
