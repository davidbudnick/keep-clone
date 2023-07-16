import React from 'react';

interface CardProps {
    title: string;
    description?: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
        <a className="m-4 block max-w-xs cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </a>
    );
};

export default Card;