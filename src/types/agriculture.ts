export interface AgricultureData {
  farmId: string;
  cropType: string;
  farmArea: number;
  irrigationType: string;
  fertilizerUsed: number;
  pesticideUsed: number;
  yield: number;
  soilType: string;
  season: string;
  waterUsage: number;
}

export interface CropAnalysis {
  cropType: string;
  averageYield: number;
  bestIrrigation: string;
  bestSoilType: string;
  averageFertilizer: number;
  averagePesticide: number;
  averageWaterUsage: number;
  recommendations: string[];
}

export interface FarmingRecommendation {
  cropType: string;
  expectedYield: number;
  fertilizerRecommendation: number;
  pesticideRecommendation: number;
  waterRequirement: number;
  confidence: 'High' | 'Medium' | 'Low';
  notes: string;
}

export interface CropComparison {
  crop: string;
  avgYield: number;
  avgFertilizer: number;
  avgWaterUsage: number;
  profitability: 'High' | 'Medium' | 'Low' | 'Unknown';
}