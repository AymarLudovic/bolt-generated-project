import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiIntegration() {
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [apiKey, setApiKey] = useState(''); // Ajout d'un état pour la clé API
  const [apiKeyInput, setApiKeyInput] = useState(''); // Ajout d'un état pour l'input de la clé API

  useEffect(() => {
    // Charger la clé API depuis le localStorage au montage du composant
    const storedApiKey = localStorage.getItem('geminiApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  useEffect(() => {
    // Sauvegarder la clé API dans le localStorage à chaque changement
    if (apiKey) {
      localStorage.setItem('geminiApiKey', apiKey);
    }
  }, [apiKey]);

  const handleApiKeyChange = (e) => {
    setApiKeyInput(e.target.value);
  };

  const saveApiKey = () => {
    setApiKey(apiKeyInput);
  };


  const generateCode = async () => {
    if (!apiKey) {
      alert("Please enter your Gemini API key.");
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    async function run(input) {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(input);
      return result.response.text();
    }

    const prompt = `
Tu es un expert en développement web et tu vas agir comme un générateur de code. Voici comment tu dois procéder :

1. **Compréhension de la demande :** Tu vas analyser attentivement la description fournie par l'utilisateur pour comprendre ses besoins et ses objectifs.

2. **Planification :** Sur la base de la description, tu vas planifier les étapes nécessaires pour créer le code. Cela inclut :
   - La sélection des technologies appropriées (par exemple, React, Vue, HTML, CSS, JavaScript, etc.).
   - La définition de la structure du projet (par exemple, les composants, les fichiers, les dossiers).
   - L'identification des dépendances nécessaires (par exemple, les bibliothèques, les frameworks).
   - La détermination des commandes à exécuter (par exemple, pour installer les dépendances, pour démarrer le serveur).

3. **Génération du code :** Tu vas générer le code pour chaque fichier du projet, en incluant :
   - Le code HTML pour la structure de la page.
   - Le code CSS pour la mise en forme et le style.
   - Le code JavaScript pour la logique et l'interactivité.
   - Les fichiers de configuration (par exemple, package.json pour npm).

4. **Présentation du code :** Tu vas présenter le code généré de manière claire et concise, en utilisant une syntaxe appropriée et en incluant des commentaires pour expliquer les différentes parties du code.

Voici la description de l'utilisateur : ${description}

Génère le code complet pour répondre à cette description.
`;
    const generatedCode = await run(prompt);
    setCode(generatedCode);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Intégration Gemini</h2>

      {/* Input pour la clé API */}
      {!apiKey ? (
        <div className="mb-4">
          <input
            type="text"
            className="w-full h-10 border rounded p-2 mb-2"
            placeholder="Entrez votre clé API Gemini"
            value={apiKeyInput}
            onChange={handleApiKeyChange}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={saveApiKey}
          >
            Sauvegarder la clé API
          </button>
        </div>
      ) : null}

      <textarea
        className="w-full h-32 border rounded p-2 mb-2"
        placeholder="Décrivez le code que vous voulez générer..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={generateCode}
        disabled={!apiKey} // Désactiver le bouton si la clé API n'est pas définie
      >
        Générer le code
      </button>
      {code && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">Code généré :</h3>
          <pre className="bg-gray-100 p-2 rounded">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default GeminiIntegration;
