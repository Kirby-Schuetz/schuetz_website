import { Document, Page } from 'react-pdf';
import React from 'react';
import { usePDF } from 'react-to-pdf';
import { pdfjs } from 'react-pdf';
import schuetzResume from '../../assets/schuetzResume.pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


export default function ModalContent() {
  const { toPDF, targetRef } = usePDF({filename: 'schuetzResume.pdf'});
    return (
        <div className="contactCard">
          <h1>contact card</h1>
          <button onClick={(e) => {e.preventDefault();
            window.location.href='https://www.linkedin.com/in/kirby-schuetz';
            }}
            > linkedin.com/kirby-schuetz/</button>
          <button onClick={(e) => {e.preventDefault();
            window.location.href='https://github.com/Kirby-Schuetz';
            }}
            > github.com/Kirby-Schuetz</button>
          <button onClick={() => toPDF()}>Download Resume</button>
          <Document
            file={ schuetzResume }
            >
            <Page             
            pageNumber={1} 
            style={{ width: 'auto', height: '100%' }}/>
          </Document>
        </div>
        
    );
}