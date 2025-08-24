// lib/vapi.ts
import Vapi from "@vapi-ai/web";

if (!process.env.VAPI_API_KEY) {
  throw new Error("NEXT_PUBLIC_VAPI_API_KEY is not defined");
}

export const vapi = new Vapi(process.env.VAPI_API_KEY);

const assistantId = process.env.ASSISTANT_ID;

if (!assistantId) {
  throw new Error("NEXT_PUBLIC_ASSISTANT_ID is not defined");
}

export interface AssistantOverrides {
  variableValues: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
  };
}

export const startAssistant = async (
  firstname?: string,
  lastname?: string,
  email?: string,
  phone?: string
) => {
  const assistantOverrides: AssistantOverrides = {
    variableValues: {
      firstname,
      lastname,
      email,
      phone,
    },
  };
  
  try {
    return await vapi.start(assistantId, assistantOverrides);
  } catch (error) {
    console.error("Error starting assistant:", error);
    throw error;
  }
};

export const stopAssistant = () => {
  try {
    vapi.stop();
  } catch (error) {
    console.error("Error stopping assistant:", error);
  }
};
