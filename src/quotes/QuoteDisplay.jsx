import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './QuoteDisplay.css';

export default function QuoteDisplay() {
    const [quote, setQuote] = useState(null);
    const [error, setError] = useState(null);

    const parseXML = (xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const quoteText = xmlDoc.querySelector("quoteText")?.textContent || "Unknown";
        const quoteAuthor = xmlDoc.querySelector("quoteAuthor")?.textContent || "Anonymous";
        
        return {
            text: quoteText,
            author: quoteAuthor
        };
    };

    const fetchQuote = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            
            const xmlData = await response.text();
            const parsedQuote = parseXML(xmlData);
            setQuote(parsedQuote);
        } catch (err) {
            setError(err.message);
        }
    };

    // Fetch a quote when component mounts
    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="quote-container">
            {error && <div className="error-message">{error}</div>}
            {quote && (
                <Card className="quote-card">
                    <Card.Body>
                        <Card.Text className="quote-text">
                            "{quote.text}"
                        </Card.Text>
                        <Card.Subtitle className="quote-author">
                            - {quote.author}
                        </Card.Subtitle>
                        <Button 
                            variant="success" 
                            onClick={fetchQuote}
                            className="mt-3"
                        >
                            Get New Quote
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
} 