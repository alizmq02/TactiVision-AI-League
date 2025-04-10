# TactiVision-AI-League

TactiVision AI League is a football (soccer) tactics simulation visualization dashboard that interfaces with Google Research Football environment. This project allows coaches and analysts to test and analyze various football tactics through AI-powered simulations.

## Disclaimer

This project uses the Google Research Football environment for AI training and simulations. Google Research Football is developed and owned by Google. **We are not claiming ownership of the Google Research Football environment**. We use it for development purposes only and provide proper attribution.

## Repository Structure

This repository contains:
1. A React-based web application for football tactics simulation visualization
2. Google's Research Football environment for running football-based reinforcement learning

## Web Application Setup

### Prerequisites

- Node.js (v14.0 or higher)
- npm (v6.0 or higher)

### Installation and Running

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TactiVision-AI-League.git
cd TactiVision-AI-League
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Google Research Football Environment Setup

Google Research Football is an open-source reinforcement learning environment that simulates a football game. Below are instructions to set it up.

### Using Docker (Recommended)

Make sure that you run it on a computer with Linux OS and installed on it Docker. This is the simplest way to run the environment on any Linux:

```bash
# GPU version on Linux
docker build --build-arg DOCKER_BASE=ubuntu:20.04 . -t gfootball_docker
docker run --gpus all -it gfootball_docker bash
```
### Running the Football Environment

#### Playing the Game

```bash
python3 -m gfootball.play_game --action_set=full
```

#### Running a Training Example

```bash
# Install additional dependencies for training
python3 -m pip install tensorflow==1.15.* dm-sonnet==1.* psutil
python3 -m pip install git+https://github.com/openai/baselines.git@master

# Run PPO training on an example scenario
python3 -m gfootball.examples.run_ppo2 --level=academy_empty_goal_close
```

### GPU Support on Linux

To run with GPU support, ensure you have:

1. NVIDIA GPU with CUDA support
2. NVIDIA drivers installed
3. CUDA Toolkit (compatible with TensorFlow 1.15.*)
4. cuDNN library

Then install TensorFlow with GPU support:

```bash
python3 -m pip install tensorflow-gpu==1.15.*
```

When running Docker, use the `--gpus all` flag as shown in the Docker section above.

## Credits

- [Google Research Football](https://github.com/google-research/football): Developed by the Google Brain team for research purposes
- Original game engine based on work by Bastiaan Konings Schuiling

## License

- Google Research Football is licensed under the Apache License 2.0

## Troubleshooting

### Common Issues

1. OpenGL-related errors: Make sure you have proper graphics drivers installed
2. Memory issues during training: Reduce batch size or use a machine with more RAM
3. Docker GPU support: Ensure NVIDIA Container Toolkit is properly installed

For more troubleshooting information, refer to [Google Research Football's documentation](https://github.com/google-research/football/blob/master/gfootball/doc/troubleshooting.md).
