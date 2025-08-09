export interface WitAiResponse {
  text: string;
  intents: Array<{
    id: string;
    name: string;
    confidence: number;
  }>;
  entities: Record<string, Array<{
    id: string;
    name: string;
    role: string;
    start: number;
    end: number;
    body: string;
    confidence: number;
    entities: any[];
    value: string;
  }>>;
  traits: Record<string, Array<{
    id: string;
    value: string;
    confidence: number;
  }>>;
}

export interface ProcessedWitResponse {
  intent: string;
  confidence: number;
  entities: Record<string, string>;
  traits: Record<string, string>;
  category: string;
}

export class WitAiService {
  private static instance: WitAiService;
  private apiToken: string = '2TLKDUQ6I2P55KW4TK4IVVYYKW6JROFR';
  private baseUrl: string = 'https://api.wit.ai';

  private constructor() {}

  public static getInstance(): WitAiService {
    if (!WitAiService.instance) {
      WitAiService.instance = new WitAiService();
    }
    return WitAiService.instance;
  }

  public async processMessage(message: string): Promise<ProcessedWitResponse> {
    try {
      const encodedMessage = encodeURIComponent(message);
      const url = `${this.baseUrl}/message?v=20250809&q=${encodedMessage}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Wit.ai API error: ${response.status}`);
      }

      const data: WitAiResponse = await response.json();
      return this.processWitResponse(data);
    } catch (error) {
      console.error('Wit.ai processing error:', error);
      // Fallback to basic keyword detection
      return this.fallbackProcessing(message);
    }
  }

  private processWitResponse(response: WitAiResponse): ProcessedWitResponse {
    // Extract the highest confidence intent
    const topIntent = response.intents.length > 0 
      ? response.intents.reduce((prev, current) => 
          prev.confidence > current.confidence ? prev : current
        )
      : { name: 'general', confidence: 0 };

    // Extract entities
    const entities: Record<string, string> = {};
    Object.entries(response.entities).forEach(([key, entityArray]) => {
      if (entityArray.length > 0) {
        entities[key] = entityArray[0].value;
      }
    });

    // Extract traits
    const traits: Record<string, string> = {};
    Object.entries(response.traits).forEach(([key, traitArray]) => {
      if (traitArray.length > 0) {
        traits[key] = traitArray[0].value;
      }
    });

    // Map intent to farming category
    const category = this.mapIntentToCategory(topIntent.name, entities);

    return {
      intent: topIntent.name,
      confidence: topIntent.confidence,
      entities,
      traits,
      category,
    };
  }

  private mapIntentToCategory(intent: string, entities: Record<string, string>): string {
    // Map Wit.ai intents to farming categories
    const intentCategoryMap: Record<string, string> = {
      'crop_advice': 'crop',
      'pest_control': 'pest',
      'weather_query': 'weather',
      'market_prices': 'market',
      'livestock_care': 'livestock',
      'soil_management': 'soil',
      'irrigation': 'water',
      'government_schemes': 'schemes',
      'seasonal_planting': 'seasonal',
    };

    // Check for specific entities that might indicate category
    if (entities.crop || entities.plant) return 'crop';
    if (entities.animal || entities.livestock) return 'livestock';
    if (entities.pest || entities.disease) return 'pest';
    if (entities.weather) return 'weather';
    if (entities.market || entities.price) return 'market';

    return intentCategoryMap[intent] || 'general';
  }

  private fallbackProcessing(message: string): ProcessedWitResponse {
    const lowerMessage = message.toLowerCase();
    
    // Basic keyword detection as fallback
    const keywords = {
      crop: ['crop', 'plant', 'seed', 'harvest', 'grow', 'maize', 'wheat', 'tomato'],
      livestock: ['cattle', 'cow', 'sheep', 'goat', 'chicken', 'livestock', 'animal'],
      pest: ['pest', 'disease', 'insect', 'bug', 'fungus', 'rot', 'blight'],
      weather: ['weather', 'rain', 'drought', 'temperature', 'climate'],
      market: ['price', 'market', 'sell', 'buy', 'profit', 'cost'],
      soil: ['soil', 'fertilizer', 'compost', 'nutrients', 'ph'],
    };

    let category = 'general';
    let maxMatches = 0;

    Object.entries(keywords).forEach(([cat, words]) => {
      const matches = words.filter(word => lowerMessage.includes(word)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        category = cat;
      }
    });

    return {
      intent: 'general',
      confidence: 0.5,
      entities: {},
      traits: {},
      category,
    };
  }

  public generateSmartResponse(
    processedInput: ProcessedWitResponse,
    originalMessage: string,
    context?: any
  ): string {
    const { intent, category, entities, confidence } = processedInput;

    // Generate contextual responses based on Wit.ai understanding
    if (confidence > 0.7) {
      return this.generateHighConfidenceResponse(intent, category, entities, originalMessage);
    } else {
      return this.generateGeneralResponse(category, originalMessage);
    }
  }

  private generateHighConfidenceResponse(
    intent: string,
    category: string,
    entities: Record<string, string>,
    message: string
  ): string {
    const responses: Record<string, string[]> = {
      crop_advice: [
        `Based on your query about ${entities.crop || 'crops'}, I recommend focusing on soil preparation and proper spacing. What specific crop are you planning to grow?`,
        `For optimal ${entities.crop || 'crop'} growth, consider the current season and your soil type. Would you like specific planting recommendations?`,
      ],
      pest_control: [
        `I understand you're dealing with ${entities.pest || 'pest'} issues. For effective control, I recommend integrated pest management combining biological and chemical approaches.`,
        `${entities.pest || 'Pest'} problems can be serious. Let me help you identify the best treatment options for your specific situation.`,
      ],
      weather_query: [
        `Current weather conditions show ${entities.weather || 'variable conditions'}. This affects your farming activities - would you like specific recommendations?`,
        `Weather planning is crucial for farming success. Based on current forecasts, here's what you should consider...`,
      ],
      livestock_care: [
        `For ${entities.animal || 'livestock'} health, regular monitoring and proper nutrition are essential. What specific concerns do you have?`,
        `${entities.animal || 'Animal'} care requires attention to housing, feeding, and health management. Let me provide specific guidance.`,
      ],
    };

    const intentResponses = responses[intent];
    if (intentResponses) {
      return intentResponses[Math.floor(Math.random() * intentResponses.length)];
    }

    return this.generateGeneralResponse(category, message);
  }

  private generateGeneralResponse(category: string, message: string): string {
    const categoryResponses: Record<string, string[]> = {
      crop: [
        "I can help you with crop management. What specific crop-related question do you have?",
        "Crop success depends on many factors including soil, weather, and timing. What would you like to know?",
      ],
      livestock: [
        "Livestock management is crucial for farm success. What animal-related question can I help with?",
        "Proper animal care involves nutrition, health monitoring, and housing. What specific guidance do you need?",
      ],
      pest: [
        "Pest and disease management requires early detection and proper treatment. What symptoms are you observing?",
        "Integrated pest management is the most effective approach. Can you describe the specific problem you're facing?",
      ],
      weather: [
        "Weather planning is essential for farming operations. What weather-related information do you need?",
        "Current conditions affect planting, harvesting, and livestock care. How can I help with weather planning?",
      ],
      market: [
        "Market information helps you make better selling decisions. What crop or livestock prices are you interested in?",
        "Understanding market trends can improve your profitability. What market information do you need?",
      ],
    };

    const responses = categoryResponses[category] || [
      "I'm here to help with all your farming questions. Can you provide more details about what you need assistance with?",
      "As your farming assistant, I can help with crops, livestock, weather, markets, and more. What specific area interests you?",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const witAiService = WitAiService.getInstance();