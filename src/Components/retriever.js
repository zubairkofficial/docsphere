import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

const openAIApiKey = "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";

const embeddings = new OpenAIEmbeddings({openAIApiKey});
const sbUrl = 'https://viekdgdthevphwbclorz.supabase.co';
const sbApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZWtkZ2R0aGV2cGh3YmNsb3J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjM3MTc4NiwiZXhwIjoyMDMxOTQ3Nzg2fQ.9Yv-S6qUjfPj3Y-4TiuguYHC_EPH7AOoAIdSzec97bQ';
const client = createClient(sbUrl, sbApiKey);

const vectorStore = new SupabaseVectorStore(embeddings,{
    client,
    tableName:'documents',
    queryName:'match_documents'
});

const retriever = vectorStore.asRetriever();

export {retriever}