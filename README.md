
# CineLens AI - Movie Review & Recommendation Assistant

CineLens AI is a sophisticated movie analysis tool powered by Google Gemini AI. It aggregates sentiments from major platforms like IMDb, Rotten Tomatoes, and Metacritic to provide detailed insights, weighted reviews, and personalized recommendations.

## Features

- **Multi-Platform Sentiment Analysis**: Aggregates data patterns to identify consistent strengths and weaknesses.
- **Localized Availability**: Checks streaming availability based on your selected region.
- **Industry Specificity**: Tailors insights for Hollywood, Bollywood, Hallyu, and more.
- **Advanced Recommendations**: Suggests movies based on mood and time availability.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Engine**: Google Gemini API (`gemini-3-pro-preview`)
- **Build Tool**: Vite
- **Deployment**: Vercel

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

3. **Run Locally**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Deployment on Vercel

1. Push this code to a GitHub repository.
2. Import the project in Vercel.
3. Add the `API_KEY` environment variable in the Vercel Project Settings.
4. Deploy!
