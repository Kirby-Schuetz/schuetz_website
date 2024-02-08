import { Document, Page, pdfjs } from 'react-pdf';
// import React from 'react';
import downloadIcon from ".../assets/downloadIcon.png";
import githubIcon from ".../assets/githubIcon.png";
import linkedinIcon from ".../assets/linkedinIcon.png";
// import { usePDF } from 'react-to-pdf';
import schuetzResume from '../../assets/schuetzResume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


export default function ModalContent() {
  // const { toPDF, targetRef } = usePDF({filename: 'schuetzResume.pdf'}); // This hook is commented out to test if needed
  return (
    <div className="contactCard">
      <h1>contact card</h1>
      <button onClick={() => window.location.href='https://www.linkedin.com/in/kirby-schuetz'}>
        <img src={linkedinIcon} alt="linkedin link" width="25" height="25"/>
      </button>
      <button onClick={() => window.location.href='https://github.com/Kirby-Schuetz'}>
        <img src={githubIcon} alt="github link" width="25" height="25"/>
      </button>
      {/* <button onClick={() => toPDF()}> */}
      <button onClick={() => alert('Download button clicked')}> {/* Placeholder for the download action */}
        <img src={downloadIcon} alt="download resume link" width="25" height="25"/>
      </button>
      {/* <Document file={ schuetzResume }> */}
      <Document file={schuetzResume} onLoadSuccess={console.log('Document loaded successfully')}>
        <Page pageNumber={1} style={{ width: 'auto', height: '100%' }}/>
      </Document>
    </div>
  );
}