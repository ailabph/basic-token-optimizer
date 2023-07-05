//src/pages/api/process.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let text = req.body.text;
    let fileType = req.body.fileType;
    // Remove all leading/trailing white space
    text = text.trim();
    // Replace multiple spaces with a single space
    text = text.replace(/\s\s+/g, ' ');

    if (fileType === 'js' || fileType === 'ts' || fileType === 'sol') {
      // Replace indents/tabs with a single space
      text = text.replace(/\t+/g, ' ');
      // Remove unnecessary spaces around brackets
      text = text.replace(/\s*([{}[\]()])\s*/g, '$1');
      // Remove unnecessary spaces around operators
      text = text.replace(/\s*([=+-/*])\s*/g, '$1');
      // Remove unnecessary semicolons
      text = text.replace(/;\s*([{}[\]()])/g, '$1');
      // Remove comments
      text = text.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'');
    }

    // Return processed text
    res.status(200).json({ text });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}