import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const LoginUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        // Exemple de validation simple
        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        // Effectuer l'appel à l'API pour la connexion
        console.log("Connexion en cours avec :", { email, password });

        // Réinitialiser le message d'erreur après l'envoi
        setError("");
    };

    return (
        <div className="container mt-5">
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Se connecter
                </button>
            </form>
            <br/>
            <p className="text-primary mt-3">
                <i>
                    <a href="/Reconnection">Mot de passe oublié ?</a>
                </i>

                <i>
                    <a href="/Register">S'inscrire</a>
                </i>
            </p>
            {error && <p className="text-danger mt-2">{error}</p>}
        </div>
    );
};


export default LoginUser;