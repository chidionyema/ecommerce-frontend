import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands, faUsers, faDonate, faFire, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';

const steps = [
    { name: 'Ritual Creation', icon: faPrayingHands, description: 'Create and customize your own rituals.' },
    { name: 'Participation', icon: faUsers, description: 'Join and participate in community rituals.' },
    { name: 'Donation', icon: faDonate, description: 'Support causes by making donations.' },
    { name: 'Invocation', icon: faFire, description: 'Invoke and perform rituals with guided assistance.' },
    { name: 'Petition', icon: faFileSignature, description: 'Submit petitions for spiritual support.' },
    { name: 'Community', icon: faUsers, description: 'Engage with a community of like-minded individuals.' }
];

const StepsSection: React.FC = () => (
    <section className="steps-section">
        <div className="container">
            <Typography variant="h4" gutterBottom>
                How It Works
            </Typography>
            <ul className="steps-list">
                {steps.map((step, idx) => (
                    <li key={idx} className="step-item">
                        <Link href={`#${step.name.toLowerCase()}`}>
                            <span className="step-link">
                                <FontAwesomeIcon icon={step.icon} className="step-icon" />
                                <span className="step-name">{step.name}</span>
                                <span className="step-description">{step.description}</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <style jsx>{`
            .steps-section {
                background-color: #f9f9f9;
                padding: 2em 0;
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
            }

            .steps-list {
                list-style: none;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0;
                margin: 0;
            }

            .step-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                flex: 1;
            }

            .step-item:not(:last-child)::after {
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                width: 2px;
                height: 50px;
                background: #333;
                transform: translateY(-50%);
            }

            .step-link {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: linear-gradient(145deg, #e6e6e6, #ffffff);
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 6px 6px 12px #b8b8b8, -6px -6px 12px #ffffff;
                transition: transform 0.3s;
                text-decoration: none;
                color: #333;
                width: 150px;
                height: 150px;
                justify-content: center;
            }

            .step-link:hover {
                transform: translateY(-5px);
            }

            .step-icon {
                font-size: 2.5em;
                color: #333;
                margin-bottom: 0.5rem;
            }

            .step-name {
                font-weight: 500;
                text-align: center;
            }

            .step-description {
                font-size: 0.8em;
                text-align: center;
                margin-top: 0.5rem;
            }

            @media (max-width: 1024px) {
                .step-link {
                    width: 120px;
                    height: 120px;
                }

                .step-icon {
                    font-size: 2em;
                }
            }

            @media (max-width: 768px) {
                .step-link {
                    width: 100px;
                    height: 100px;
                }

                .step-icon {
                    font-size: 1.8em;
                }

                .step-name {
                    font-size: 0.9em;
                }

                .step-description {
                    font-size: 0.7em;
                }
            }
        `}</style>
    </section>
);

export default StepsSection;
