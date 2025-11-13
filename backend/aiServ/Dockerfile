# Use a lightweight Python image
FROM python:3.10-slim

# Create and switch to non-root user for security
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set the working directory
WORKDIR /app

# Copy requirement file first (for caching)
COPY --chown=user requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy all code
COPY --chown=user . /app

# Expose the port Hugging Face uses
EXPOSE 7860

# Start the Flask app
CMD ["python", "app.py"]
