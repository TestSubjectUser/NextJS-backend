// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

export default function handler(req, res) {
  console.log(req.body);
  if (req.method === "POST") {
    const email = req.body.email;
    const feedbackText = req.body.feedbackText;
    // const { feedbackText, email } = req.body;
    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedbackText: feedbackText,
    };
    // console.log(newFeedback);

    // fs.writeFileSync(
    //   path.join(process.cwd(), "data", "feedback.json"),
    //   JSON.stringify(newFeedback)
    // );
    const filePath = buildFeedbackPath();
    const fileData = extractFeedback(filePath);
    fileData.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(fileData));
    res.status(201).json({ message: "Success", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}
