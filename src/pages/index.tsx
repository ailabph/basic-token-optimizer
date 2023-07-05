//src/pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('js');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText, fileType }),
    });
    const data = await response.json();
    setOutputText(data.text);
    setIsLoading(false);
  };

  const inputTokenCount = inputText.split(/\s+/).length;
  const outputTokenCount = outputText.split(/\s+/).length;
  const reduction = ((inputTokenCount - outputTokenCount) / inputTokenCount) * 100;

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-6">Input Token Optimizer</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={fileType} onChange={(e) => setFileType(e.target.value)} className="w-full p-2 border rounded text-black">
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="sol">Solidity</option>
        </select>
        <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} className="w-full p-2 border rounded text-black" rows={Number("10")} />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Process</button>
      </form>
      <p className="mt-4 white">Input token count: {inputTokenCount}</p>
      <p className="text-white">Output token count: {outputTokenCount}</p>
      <p className="text-white">Reduction: {reduction.toFixed(2)}%</p>
      {isLoading && <p className="text-black">Processing...</p>}
      <textarea value={outputText} readOnly className="w-full p-2 border rounded mt-4 text-black" rows={Number("10")} />
    </div>
  );
}