import React, { useState, useEffect } from 'react';

const quotes = [
    "Reading is essential for those who seek to rise above the ordinary",
    "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    "Today a reader, tomorrow a leader.",
    "A book is a dream that you hold in your hand.",
    "There is no friend as loyal as a book.",
    "Reading is to the mind what exercise is to the body."
];

const Contact = () => {
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }, []);

    return (
        <div className='p3 m3 flexCol justifyCenter'>
            <hr/>
            <h2>{quote}</h2>
        </div>
    );
};

export default Contact;