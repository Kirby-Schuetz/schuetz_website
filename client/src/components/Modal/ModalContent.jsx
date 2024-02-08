import { Document, Page } from 'react-pdf';
import React from 'react';
import { downloadIcon } from ".../assets/downloadIcon.png";
import { githubIcon } from ".../assets/githubIcon.png";
import { linkedinIcon } from ".../assets/linkedinIcon.png";
import { pdfjs } from 'react-pdf';
import schuetzResume from '../../assets/schuetzResume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function ModalContent() {
  // const { toPDF, targetRef } = usePDF({filename: 'schuetzResume.pdf'}); // Commented out as it's not used
  return (
    <div className="contactCard">
      <h1>contact card</h1>
      <a href="https://www.linkedin.com/in/kirby-schuetz" target="_blank" rel="noopener noreferrer">
        <img src={linkedinIcon} alt="linkedin link" width="25" height="25"/>
        linkedin.com/kirby-schuetz/
      </a>
      <a href="https://github.com/Kirby-Schuetz" target="_blank" rel="noopener noreferrer">
        <img src={githubIcon} alt="github link" width="25" height="25"/>
        github.com/Kirby-Schuetz
      </a>
      <button onClick={() => alert('Download button clicked')}>
        <img src={downloadIcon} alt="download resume link" width="25" height="25"/>
        Download Resume
      </button>
      <Document file={schuetzResume}>
        <Page pageNumber={1} style={{ width: 'auto', height: '100%' }}/>
      </Document>
    </div>
  );
}