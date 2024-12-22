import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQ.css'; // Import a custom CSS file for styling

const FAQ = () => {
    const navigate = useNavigate();

    const faqs = [
        {
            category: 'Général',
            questions: [
                { q: "Qu'est-ce qu'ASSO ?", a: "ASSO est une plateforme en ligne spécialisée dans la vente de vêtements, chaussures, habits, cosmétiques, et aliments. Nous proposons également un service de livraison rapide et fiable." },
                { q: "Comment puis-je créer un compte ?", a: "Pour créer un compte, cliquez sur le bouton 'S'inscrire' en haut de la page, puis remplissez les informations demandées." },
                { q: "Quels modes de paiement acceptez-vous ?", a: "Nous acceptons les paiements par carte bancaire, mobile money et PayPal." }
            ]
        },
        {
            category: 'Produits et Commandes',
            questions: [
                { q: "Puis-je retourner un produit ?", a: "Oui, les retours sont acceptés sous 14 jours après réception de la commande. Assurez-vous que le produit est dans son état d'origine." },
                { q: "Comment suivre ma commande ?", a: "Une fois la commande passée, vous recevrez un email avec un lien pour suivre l'état de votre commande." },
                { q: "Proposez-vous des réductions ?", a: "Oui, nous proposons régulièrement des offres promotionnelles. Consultez notre section 'Promotions' pour plus d'informations." }
            ]
        },
        {
            category: 'Livraison',
            questions: [
                { q: "Dans quelles régions livrez-vous ?", a: "Nous livrons dans toutes les régions du Cameroun où nous opérons. Vérifiez votre adresse lors de la commande pour confirmation." },
                { q: "Quels sont les délais de livraison ?", a: "Les délais de livraison varient entre 1 à 5 jours ouvrables selon votre localisation." },
                { q: "Quels sont les frais de livraison ?", a: "Les frais de livraison dépendent de votre localisation et du poids de votre commande. Les frais exacts seront affichés lors du paiement." }
            ]
        }
    ];

    return (
        <div className="faq-container">
            <button className="back-button" onClick={() => navigate('/Acceuil')}>
            <i className="fas fa-arrow-left"></i> Retour
            </button>
            <h1 className="faq-title">Foire Aux Questions (FAQ) - ASSO</h1>
            <p className="faq-intro">
                Bienvenue dans notre section FAQ ! Retrouvez ici les réponses aux questions les plus fréquentes sur notre plateforme de vente en ligne et nos services.
            </p>

            {faqs.map((section, index) => (
                <div key={index} className="faq-section">
                    <h2 className="faq-category">{section.category}</h2>
                    <ul className="faq-list">
                        {section.questions.map((item, i) => (
                            <li key={i} className="faq-item">
                                <strong>{item.q}</strong>
                                <p>{item.a}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default FAQ;