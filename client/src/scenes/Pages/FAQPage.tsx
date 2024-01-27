import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export const FAQPage = () => {
  const faqData = [
    [
      "Do you ship worldwide?",
      "Yes, for all original paintings. Shipping rates vary on location.",
    ],
    [
      "How to track new original paintings in order to buy them before the rest?",
      "The most convenient way is to subscribe to our email newsletter. You no longer have to manually check the site and worry about missing something. By subscribing, you are guaranteed to receive a notification to your mail as soon as new original works appear on the site, and you can also preview them directly in a letter to your mail without going to the site.",
    ],
    [
      "What type of canvas does Natalie use?",
      "Raw canvas with clear gesso as primer.",
    ],
    [
      "What medium does Natalie paint with?",
      "Natalie`s work is very multimedium and changes depending on the painting or series, but mostly acrylic with the addition of water depending on the piece.",
    ],
  ]
  return (
    <>
      <div className='container mt-8'>
        {faqData.map(([title, answer], id) => (
          <Accordion key={id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  )
}
