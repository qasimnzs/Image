export default async function handler(req, res) {
  const { id } = req.query;
  const cloudName = "dozknmpib";

  // Link se 'cmnko' prefix hatana taake Cloudinary par sahi image mile
  // Hum isse aur robust bana rahe hain
  const realId = id.replace(/^cmnko/, '');

  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${realId}`;

  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return res.status(404).send('Image Not Found');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const contentType = response.headers.get('content-type') || 'image/png';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(buffer);
    
  } catch (error) {
    res.status(500).send('Error');
  }
}
