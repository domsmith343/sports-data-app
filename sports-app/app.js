document.getElementById('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const playerName = document.getElementById('player-name').value.trim();
  if (playerName === '') {
    alert('Please enter a player name.');
    return;
  }

  try {
    const response = await fetch(
      'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams?sortBy=standings&rosters=false&schedules=false&topPerformers=true&teamStats=true&teamStatsSeason=2023',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '0d9b4d98f9msh75136d22af0aebap141c72jsn461dace5d0c0', // Replace with your RapidAPI key
          'X-RapidAPI-Host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log('Full Response Data:', data);  // Log the entire response to see its structure

    // Inspect the response structure to figure out where the player data resides
    if (Array.isArray(data) && data.length > 0) {
      console.log(`Array contains ${data.length} elements.`);

      // Assuming you need to loop through to find player-related data
      data.forEach((team, index) => {
        console.log(`Team ${index + 1}:`, team); // Log each team in the array to inspect the content
      });
    } else {
      console.log('Unexpected data format:', data);
      alert('Unexpected response format.');
    }
  } catch (error) {
    console.error('Error fetching player stats:', error);
    alert('An error occurred while fetching player stats.');
  }
});
