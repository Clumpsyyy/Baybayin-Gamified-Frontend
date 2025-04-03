export const predictBaybayin = async (base64Image) => {
    try {
      const response = await fetch('https://backend-ml-0t6q.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Prediction error:', error);
      return { error: 'Failed to predict' };
    }
  };