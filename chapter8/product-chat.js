const express = require('express');
const { ChatOpenAI } = require('@langchain/openai');
const { CSVLoader } = require('@langchain/community/document_loaders/fs/csv');
const { MemoryVectorStore } = require('langchain/vectorstores/memory');
const { OpenAIEmbeddings } = require('@langchain/openai');
const { RetrievalQAChain, LLMChain } = require('langchain/chains');
const { PromptTemplate } = require('@langchain/core/prompts');

const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static('public'));
app.use(express.json());

// Initialize OpenAI - you'll need to set your API key
const OPENAI_API_KEY = 'api_key_here';
const model = new ChatOpenAI({ 
    openAIApiKey: OPENAI_API_KEY,
    temperature: 0.7,
    modelName: 'gpt-4o-mini',
    maxTokens: 1000
});

// Initialize the product catalog knowledge base
let chain = null;

async function initializeKnowledgeBase() {
    try {
        // Load the CSV file
        const loader = new CSVLoader('./data/product-catalog.csv');
        const docs = await loader.load();

        // Create vector store
        const vectorStore = await MemoryVectorStore.fromDocuments(
            docs,
            new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
        );

        // Create a custom prompt template
        const promptTemplate = new PromptTemplate({
            template: `You are a helpful product catalog assistant. Use the following context to answer the question. 
            If you don't know the answer, just say you don't know.
            
            Context: {context}
            
            Question: {query}
            
            Please provide a complete and detailed answer, comparing products when relevant and including prices and features.
            Format your response in a clear, readable way:
            - Use bullet points for lists
            - Add line breaks between sections
            - Use clear headings for different comparison aspects
            - Avoid using asterisks (**) for emphasis
            - Use proper spacing and paragraphs
            
            Answer:`,
            inputVariables: ["context", "query"]
        });

        // Create chain with custom prompt
        chain = RetrievalQAChain.fromLLM(
            model,
            vectorStore.asRetriever(),
            {
                prompt: promptTemplate,
                returnSourceDocuments: true,
                verbose: true
            }
        );
        
        console.log('Knowledge base initialized successfully');
    } catch (error) {
        console.error('Error initializing knowledge base:', error);
        throw error;
    }
}

// API endpoint for chat
app.post('/chat', async (req, res) => {
    try {
        if (!chain) {
            return res.status(503).json({ error: 'Knowledge base is not yet initialized' });
        }

        const { message } = req.body;
        const response = await chain.call({
            query: message
        });

        // Format the response text
        const formattedText = response.text
            .replace(/\n/g, '<br>')  // Convert newlines to HTML breaks
            .replace(/\*\*/g, '')    // Remove asterisks
            .replace(/- /g, '• ')    // Convert dashes to bullets
            .replace(/(Price:|Features:|Display:|Battery:|Comparison:)/g, '<strong>$1</strong>'); // Bold headers

        res.json({ response: formattedText });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

// Serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start server only after initializing the knowledge base
async function startServer() {
    try {
        await initializeKnowledgeBase();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:3000`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer(); 