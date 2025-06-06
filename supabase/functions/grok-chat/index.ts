
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const xaiApiKey = Deno.env.get('XAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json();

    console.log('Received request:', { message, historyLength: history?.length || 0 });

    // Convert chat history to xAI format
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. You respond in a conversational and engaging way. Keep your responses concise but informative.'
      }
    ];

    // Add chat history
    if (history && Array.isArray(history)) {
      for (const chat of history.slice(-5)) { // Keep last 5 exchanges for context
        messages.push({ role: 'user', content: chat.user });
        messages.push({ role: 'assistant', content: chat.ai });
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log('Calling xAI API with messages:', messages.length);

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${xaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('xAI API error:', response.status, errorText);
      throw new Error(`xAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('xAI API response received');

    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in grok-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to get AI response',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
