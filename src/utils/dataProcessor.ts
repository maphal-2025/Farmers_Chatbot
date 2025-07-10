import { AgricultureData, CropAnalysis, FarmingRecommendation } from '../types/agriculture';

// Raw agriculture dataset
const rawData = `Farm_ID,Crop_Type,Farm_Area(acres),Irrigation_Type,Fertilizer_Used(tons),Pesticide_Used(kg),Yield(tons),Soil_Type,Season,Water_Usage(cubic meters)
F001,Cotton,329.4,Sprinkler,8.14,2.21,14.44,Loamy,Kharif,76648.2
F002,Carrot,18.67,Manual,4.77,4.36,42.91,Peaty,Kharif,68725.54
F003,Sugarcane,306.03,Flood,2.91,0.56,33.44,Silty,Kharif,75538.56
F004,Tomato,380.21,Rain-fed,3.32,4.35,34.08,Silty,Zaid,45401.23
F005,Tomato,135.56,Sprinkler,8.33,4.48,43.28,Clay,Zaid,93718.69
F006,Sugarcane,12.5,Sprinkler,6.42,2.25,38.18,Loamy,Zaid,46487.98
F007,Soybean,360.06,Drip,1.83,2.37,44.93,Sandy,Rabi,40583.57
F008,Rice,464.6,Drip,5.18,0.91,4.23,Silty,Kharif,9392.38
F009,Maize,389.37,Drip,0.57,4.93,3.86,Peaty,Rabi,60202.14
F010,Soybean,184.37,Drip,2.18,2.67,17.25,Sandy,Kharif,90922.15
F011,Rice,279.95,Drip,8.02,1.24,32.85,Clay,Zaid,5869.75
F012,Sugarcane,145.32,Flood,3.01,2.27,8.08,Clay,Kharif,88976.51
F013,Wheat,329.1,Drip,5.26,0.83,5.44,Clay,Zaid,45922.35
F014,Rice,246.02,Flood,1.01,3.45,11.38,Sandy,Rabi,71953.14
F015,Sugarcane,305.15,Rain-fed,5.39,2.15,28.77,Peaty,Kharif,33615.77
F016,Barley,60.22,Flood,2.19,0.35,16.03,Sandy,Zaid,25132.48
F017,Carrot,284.01,Manual,5.89,0.81,47.7,Loamy,Zaid,88301.46
F018,Maize,128.23,Rain-fed,4.91,0.77,16.67,Loamy,Rabi,18660.03
F019,Maize,460.93,Drip,1.09,1.31,39.96,Sandy,Zaid,54314.28
F020,Barley,58.85,Sprinkler,3.61,3.32,18.85,Sandy,Kharif,92481.89
F021,Cotton,377.05,Drip,5.95,0.91,29.17,Clay,Rabi,26743.55
F022,Wheat,92.67,Flood,6.95,3.64,30.7,Clay,Rabi,42874.34
F023,Potato,15.67,Drip,9.95,2.99,18.13,Loamy,Zaid,41862.86
F024,Rice,483.88,Drip,6.31,2.29,34.46,Clay,Zaid,61383.07
F025,Barley,75.64,Flood,6.69,3.57,6.14,Silty,Zaid,43847.82
F026,Wheat,162.28,Flood,5.85,2.42,24.63,Loamy,Rabi,65838.4
F027,Cotton,375.1,Rain-fed,0.5,4.76,22.51,Clay,Kharif,39362.44
F028,Tomato,256.19,Flood,7.32,2.19,48.02,Silty,Rabi,81313.04
F029,Wheat,288.52,Manual,1.79,4.78,36.9,Silty,Zaid,23208.04
F030,Potato,286.52,Rain-fed,8.91,0.77,30.5,Loamy,Zaid,93407.38
F031,Barley,136.16,Flood,5.89,1.36,11.86,Clay,Zaid,30098.35
F032,Carrot,350.42,Flood,8.4,2.94,24.34,Clay,Rabi,71580.87
F033,Barley,446.76,Drip,7.79,0.96,46.47,Loamy,Zaid,93656.06
F034,Tomato,264.12,Drip,4.75,4.79,12.92,Loamy,Rabi,92745.01
F035,Soybean,266.03,Drip,8.57,1.35,34.45,Silty,Zaid,43610.21
F036,Cotton,446.16,Manual,4.35,3.47,12.53,Loamy,Zaid,38874.28
F037,Soybean,156.1,Manual,1.18,4.43,40.15,Loamy,Zaid,73646.55
F038,Barley,431.22,Drip,5.71,3.18,45.95,Silty,Kharif,36065.94
F039,Cotton,220.48,Flood,9.96,2.91,10.53,Clay,Zaid,82549.03
F040,Cotton,166.82,Rain-fed,2.85,1.36,46.19,Sandy,Zaid,12007.7
F041,Rice,370.79,Flood,8.18,4.99,35.01,Sandy,Kharif,85208.71
F042,Sugarcane,418.99,Sprinkler,0.78,0.58,26.29,Clay,Zaid,33705.69
F043,Cotton,78.79,Flood,1.35,3.0,11.45,Sandy,Zaid,94754.73
F044,Soybean,84.12,Manual,4.64,2.53,24.77,Sandy,Rabi,40614.4
F045,Tomato,326.69,Sprinkler,5.24,0.55,18.34,Peaty,Kharif,37466.11
F046,Carrot,112.8,Sprinkler,1.8,1.01,31.57,Clay,Kharif,79966.1
F047,Potato,347.66,Drip,3.86,2.68,31.47,Sandy,Kharif,86989.88
F048,Potato,77.39,Sprinkler,9.34,3.0,20.53,Silty,Zaid,5874.17
F049,Barley,462.37,Sprinkler,2.3,0.14,39.51,Clay,Kharif,53879.87
F050,Tomato,292.25,Rain-fed,4.08,0.76,45.14,Silty,Kharif,90232.08`;

// Parse and clean the dataset
export function parseAgricultureData(): AgricultureData[] {
  const lines = rawData.trim().split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return {
      farmId: values[0],
      cropType: values[1],
      farmArea: parseFloat(values[2]),
      irrigationType: values[3],
      fertilizerUsed: parseFloat(values[4]),
      pesticideUsed: parseFloat(values[5]),
      yield: parseFloat(values[6]),
      soilType: values[7],
      season: values[8],
      waterUsage: parseFloat(values[9])
    };
  });
}

// Get crop analysis and recommendations
export function getCropAnalysis(cropType: string): CropAnalysis {
  const data = parseAgricultureData();
  const cropData = data.filter(farm => 
    farm.cropType.toLowerCase() === cropType.toLowerCase()
  );

  if (cropData.length === 0) {
    return {
      cropType,
      averageYield: 0,
      bestIrrigation: 'Drip',
      bestSoilType: 'Loamy',
      averageFertilizer: 0,
      averagePesticide: 0,
      averageWaterUsage: 0,
      recommendations: [`No data available for ${cropType}. Consider consulting local agricultural extension services.`]
    };
  }

  // Calculate averages
  const avgYield = cropData.reduce((sum, farm) => sum + farm.yield, 0) / cropData.length;
  const avgFertilizer = cropData.reduce((sum, farm) => sum + farm.fertilizerUsed, 0) / cropData.length;
  const avgPesticide = cropData.reduce((sum, farm) => sum + farm.pesticideUsed, 0) / cropData.length;
  const avgWaterUsage = cropData.reduce((sum, farm) => sum + farm.waterUsage, 0) / cropData.length;

  // Find best performing irrigation and soil types
  const irrigationPerformance = cropData.reduce((acc, farm) => {
    if (!acc[farm.irrigationType]) {
      acc[farm.irrigationType] = { totalYield: 0, count: 0 };
    }
    acc[farm.irrigationType].totalYield += farm.yield;
    acc[farm.irrigationType].count += 1;
    return acc;
  }, {} as Record<string, { totalYield: number; count: number }>);

  const soilPerformance = cropData.reduce((acc, farm) => {
    if (!acc[farm.soilType]) {
      acc[farm.soilType] = { totalYield: 0, count: 0 };
    }
    acc[farm.soilType].totalYield += farm.yield;
    acc[farm.soilType].count += 1;
    return acc;
  }, {} as Record<string, { totalYield: number; count: number }>);

  const bestIrrigation = Object.entries(irrigationPerformance)
    .map(([type, data]) => ({ type, avgYield: data.totalYield / data.count }))
    .sort((a, b) => b.avgYield - a.avgYield)[0]?.type || 'Drip';

  const bestSoilType = Object.entries(soilPerformance)
    .map(([type, data]) => ({ type, avgYield: data.totalYield / data.count }))
    .sort((a, b) => b.avgYield - a.avgYield)[0]?.type || 'Loamy';

  // Generate recommendations
  const recommendations = generateRecommendations(cropType, {
    avgYield,
    avgFertilizer,
    avgPesticide,
    avgWaterUsage,
    bestIrrigation,
    bestSoilType,
    cropData
  });

  return {
    cropType,
    averageYield: Math.round(avgYield * 100) / 100,
    bestIrrigation,
    bestSoilType,
    averageFertilizer: Math.round(avgFertilizer * 100) / 100,
    averagePesticide: Math.round(avgPesticide * 100) / 100,
    averageWaterUsage: Math.round(avgWaterUsage),
    recommendations
  };
}

function generateRecommendations(cropType: string, analysis: any): string[] {
  const recommendations: string[] = [];
  
  // Yield optimization
  if (analysis.avgYield < 20) {
    recommendations.push(`📈 **Yield Optimization**: Current average yield for ${cropType} is ${analysis.avgYield} tons. Consider increasing fertilizer application or improving soil preparation.`);
  } else if (analysis.avgYield > 40) {
    recommendations.push(`🎯 **Excellent Performance**: Your ${cropType} yield potential is high (${analysis.avgYield} tons average). Focus on maintaining current practices.`);
  }

  // Irrigation recommendations
  recommendations.push(`💧 **Best Irrigation**: ${analysis.bestIrrigation} irrigation shows highest yields for ${cropType}. Average water usage: ${analysis.avgWaterUsage.toLocaleString()} cubic meters.`);

  // Soil recommendations
  recommendations.push(`🌱 **Optimal Soil**: ${analysis.bestSoilType} soil performs best for ${cropType}. Consider soil amendments if your soil type differs.`);

  // Fertilizer efficiency
  if (analysis.avgFertilizer > 7) {
    recommendations.push(`⚠️ **Fertilizer Efficiency**: High fertilizer usage (${analysis.avgFertilizer} tons). Consider soil testing to optimize application rates.`);
  } else if (analysis.avgFertilizer < 3) {
    recommendations.push(`🌿 **Fertilizer Opportunity**: Low fertilizer usage (${analysis.avgFertilizer} tons). Increasing application may improve yields.`);
  }

  // Pesticide management
  if (analysis.avgPesticide > 3) {
    recommendations.push(`🐛 **IPM Approach**: High pesticide usage (${analysis.avgPesticide} kg). Consider integrated pest management to reduce chemical dependency.`);
  }

  // Crop-specific recommendations
  switch (cropType.toLowerCase()) {
    case 'maize':
      recommendations.push(`🌽 **Maize Specific**: Plant after soil temperature reaches 15°C. Side-dress with nitrogen at knee-high stage for optimal growth.`);
      break;
    case 'tomato':
      recommendations.push(`🍅 **Tomato Care**: Provide support structures and ensure consistent moisture. Mulch around plants to prevent soil-borne diseases.`);
      break;
    case 'rice':
      recommendations.push(`🌾 **Rice Management**: Maintain 2-5cm water depth during growing season. Monitor for blast disease and brown planthopper.`);
      break;
    case 'wheat':
      recommendations.push(`🌾 **Wheat Production**: Plant in cool season. Apply nitrogen in split doses - at planting and tillering stage.`);
      break;
    case 'cotton':
      recommendations.push(`🌿 **Cotton Care**: Monitor for bollworm and aphids. Ensure adequate potassium for fiber quality.`);
      break;
    case 'sugarcane':
      recommendations.push(`🎋 **Sugarcane Management**: Requires high water input. Plant in furrows and maintain weed-free conditions for first 120 days.`);
      break;
  }

  return recommendations;
}

// Get farming recommendations based on conditions
export function getFarmingRecommendations(
  soilType: string,
  season: string,
  irrigationType: string
): FarmingRecommendation[] {
  const data = parseAgricultureData();
  
  // Filter data based on conditions
  const matchingFarms = data.filter(farm => 
    farm.soilType.toLowerCase() === soilType.toLowerCase() &&
    farm.season.toLowerCase() === season.toLowerCase() &&
    farm.irrigationType.toLowerCase() === irrigationType.toLowerCase()
  );

  if (matchingFarms.length === 0) {
    return [{
      cropType: 'General',
      expectedYield: 0,
      fertilizerRecommendation: 5,
      pesticideRecommendation: 2,
      waterRequirement: 50000,
      confidence: 'Low',
      notes: `Limited data for ${soilType} soil with ${irrigationType} irrigation in ${season} season. Consider consulting local extension services.`
    }];
  }

  // Group by crop type and calculate averages
  const cropGroups = matchingFarms.reduce((acc, farm) => {
    if (!acc[farm.cropType]) {
      acc[farm.cropType] = [];
    }
    acc[farm.cropType].push(farm);
    return acc;
  }, {} as Record<string, AgricultureData[]>);

  return Object.entries(cropGroups).map(([cropType, farms]) => {
    const avgYield = farms.reduce((sum, farm) => sum + farm.yield, 0) / farms.length;
    const avgFertilizer = farms.reduce((sum, farm) => sum + farm.fertilizerUsed, 0) / farms.length;
    const avgPesticide = farms.reduce((sum, farm) => sum + farm.pesticideUsed, 0) / farms.length;
    const avgWater = farms.reduce((sum, farm) => sum + farm.waterUsage, 0) / farms.length;

    const confidence = farms.length >= 3 ? 'High' : farms.length >= 2 ? 'Medium' : 'Low';

    return {
      cropType,
      expectedYield: Math.round(avgYield * 100) / 100,
      fertilizerRecommendation: Math.round(avgFertilizer * 100) / 100,
      pesticideRecommendation: Math.round(avgPesticide * 100) / 100,
      waterRequirement: Math.round(avgWater),
      confidence,
      notes: `Based on ${farms.length} similar farm(s). Expected yield: ${Math.round(avgYield * 100) / 100} tons per acre.`
    };
  }).sort((a, b) => b.expectedYield - a.expectedYield);
}

// Get crop comparison data
export function compareCrops(crops: string[]): any {
  const data = parseAgricultureData();
  
  return crops.map(crop => {
    const cropData = data.filter(farm => 
      farm.cropType.toLowerCase() === crop.toLowerCase()
    );

    if (cropData.length === 0) {
      return {
        crop,
        avgYield: 0,
        avgFertilizer: 0,
        avgWaterUsage: 0,
        profitability: 'Unknown'
      };
    }

    const avgYield = cropData.reduce((sum, farm) => sum + farm.yield, 0) / cropData.length;
    const avgFertilizer = cropData.reduce((sum, farm) => sum + farm.fertilizerUsed, 0) / cropData.length;
    const avgWaterUsage = cropData.reduce((sum, farm) => sum + farm.waterUsage, 0) / cropData.length;

    // Simple profitability calculation (yield vs input costs)
    const inputCost = avgFertilizer * 1000 + avgWaterUsage * 0.1; // Simplified cost calculation
    const profitability = avgYield > inputCost / 500 ? 'High' : avgYield > inputCost / 1000 ? 'Medium' : 'Low';

    return {
      crop,
      avgYield: Math.round(avgYield * 100) / 100,
      avgFertilizer: Math.round(avgFertilizer * 100) / 100,
      avgWaterUsage: Math.round(avgWaterUsage),
      profitability
    };
  });
}