import React, { useState, useEffect, useRef } from 'react';


import { 
  Camera, RotateCw, ZoomIn, ZoomOut, Users, ChevronRight, Bell, Settings, Menu, X, 
  Database, Activity, Eye, Award, MessageSquare, Play, Pause, SkipForward, Clock, 
  Cloud, Sun, CloudRain, ChevronDown, RefreshCw, BarChart2, Save, FileText, AlertTriangle, 
  UserPlus, UserMinus, User, Search, CheckCircle, Layers, Cpu, Zap, Download, Video, 
  PlusCircle, Upload, Brain, Briefcase, Book, ArrowRight, ArrowLeft, Check, Trophy,
  Share
} from 'lucide-react';

const TactiVisionAURADashboard = () => {
  // Main page state
  const [currentPage, setCurrentPage] = useState('welcome'); // welcome, team-setup, opponent-setup, ai-agents, simulation, report
  
  // Setup wizard state
  const [autoFilling, setAutoFilling] = useState(false);
  const [autoFillProgress, setAutoFillProgress] = useState(0);
  const [autoFillTeam, setAutoFillTeam] = useState('');
  const [teamName, setTeamName] = useState('Al-Hilal');
  const [opponentName, setOpponentName] = useState('Al-Nassr');
  const [formationChoice, setFormationChoice] = useState('4-2-3-1');
  const [playingStyle, setPlayingStyle] = useState('possession');
  const [opponentFormation, setOpponentFormation] = useState('4-3-3');
  const [opponentStyle, setOpponentStyle] = useState('counter-attack');
  
  // Simulation state
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [processingAgents, setProcessingAgents] = useState(false);
  const [agentsCreated, setAgentsCreated] = useState(0);
  const [showSimulationOptions, setShowSimulationOptions] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [pitchCondition, setPitchCondition] = useState('good');
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [crowdMorale, setCrowdMorale] = useState('enthusiastic');
  const [homeAdvantage, setHomeAdvantage] = useState(true);
  
  // Simulation metrics
  const [simulationTime, setSimulationTime] = useState(0);
  const [score, setScore] = useState({ home: 0, away: 0 });
  const [possession, setPossession] = useState({ home: 60, away: 40 });
  const [matchEvents, setMatchEvents] = useState([]);
  const [reportTab, setReportTab] = useState('summary');
  
  // Notifications
  const [notifications, setNotifications] = useState([]);

  // Base player data for home team with added attributes
  const [players, setPlayers] = useState([
    { id: 1, number: 1, name: "Ahmed Al-Khabari", position: "GK", baseX: 50, baseY: 85, x: 50, y: 85, vx: 0, vy: 0, 
      stats: { 
        speed: 78, stamina: 82, positioning: 89, passing: 76, tackling: 45, shooting: 32,
        height: 190, weight: 85, dribbling: 45, defending: 88, physical: 84
      }, 
      risk: "Low", fatigue: 12, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      analysisReport: {
        summary: "Solid goalkeeper with excellent positioning",
        strengths: ["Shot stopping", "Positioning", "Presence in the box"],
        weaknesses: ["Distribution under pressure", "Speed off the line"],
        performance: 8.2,
        recommendedTraining: "Work on quick distribution to wingers"
      }
    },
    { id: 2, number: 4, name: "Omar Al-Harbi", position: "CB", baseX: 35, baseY: 70, x: 35, y: 70, vx: 0, vy: 0, 
      stats: { 
        speed: 81, stamina: 85, positioning: 88, passing: 79, tackling: 87, shooting: 45,
        height: 187, weight: 82, dribbling: 65, defending: 90, physical: 88
      }, 
      risk: "Low", fatigue: 28, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      analysisReport: {
        summary: "Commanding center back with excellent tackling ability",
        strengths: ["Aerial duels", "Tackling", "Leadership"],
        weaknesses: ["Turning speed against fast attackers"],
        performance: 7.8,
        recommendedTraining: "Improve quick turning in defensive situations"
      }
    },
    { id: 3, number: 5, name: "Khalid Al-Rashidi", position: "CB", baseX: 65, baseY: 70, x: 65, y: 70, vx: 0, vy: 0, 
      stats: { 
        speed: 83, stamina: 87, positioning: 86, passing: 80, tackling: 89, shooting: 39,
        height: 186, weight: 80, dribbling: 62, defending: 91, physical: 86
      }, 
      risk: "Medium", fatigue: 42, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      analysisReport: {
        summary: "Intelligent defender with good ball playing abilities",
        strengths: ["Reading the game", "Interceptions", "Accurate passing"],
        weaknesses: ["Vulnerable to high press", "Speed over long distances"],
        performance: 7.5,
        recommendedTraining: "High intensity sprint training"
      }
    },
    { id: 4, number: 2, name: "Fahad Al-Muwallad", position: "RB", baseX: 85, baseY: 70, x: 85, y: 70, vx: 0, vy: 0, 
      stats: { 
        speed: 92, stamina: 84, positioning: 79, passing: 76, tackling: 82, shooting: 58,
        height: 175, weight: 72, dribbling: 78, defending: 83, physical: 79
      }, 
      risk: "High", fatigue: 65, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      analysisReport: {
        summary: "Attacking right-back with excellent pace",
        strengths: ["Speed on offensive transitions", "Crossing", "Recovery runs"],
        weaknesses: ["Defensive positioning", "Fatigue management in final 20 minutes"],
        performance: 6.9,
        recommendedTraining: "Defensive positioning drills, stamina training"
      }
    },
    { id: 5, number: 3, name: "Hassan Al-Otaibi", position: "LB", baseX: 15, baseY: 70, x: 15, y: 70, vx: 0, vy: 0, 
      stats: { 
        speed: 89, stamina: 86, positioning: 82, passing: 78, tackling: 83, shooting: 51,
        height: 178, weight: 74, dribbling: 75, defending: 84, physical: 80
      }, 
      risk: "Low", fatigue: 35, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      analysisReport: {
        summary: "Reliable left-back with good defensive awareness",
        strengths: ["1v1 defending", "Tactical awareness", "Overlapping runs"],
        weaknesses: ["Final third decision making"],
        performance: 7.9,
        recommendedTraining: "Final third decision making drills"
      }
    },
    { id: 6, number: 6, name: "Mohammed Al-Sahlawi", position: "CDM", baseX: 35, baseY: 50, x: 35, y: 50, vx: 0, vy: 0, 
      stats: { 
        speed: 80, stamina: 90, positioning: 91, passing: 87, tackling: 85, shooting: 64,
        height: 182, weight: 78, dribbling: 79, defending: 87, physical: 88
      }, 
      risk: "Low", fatigue: 33, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/6.jpg",
      analysisReport: {
        summary: "Intelligent defensive midfielder with excellent positioning",
        strengths: ["Intercepting passes", "Breaking up attacks", "Distributing ball"],
        weaknesses: ["Speed against counter-attacks"],
        performance: 8.3,
        recommendedTraining: "Quick transition defending"
      }
    },
    { id: 7, number: 8, name: "Yasser Al-Shahrani", position: "CDM", baseX: 65, baseY: 50, x: 65, y: 50, vx: 0, vy: 0, 
      stats: { 
        speed: 78, stamina: 93, positioning: 88, passing: 89, tackling: 86, shooting: 60,
        height: 177, weight: 76, dribbling: 82, defending: 85, physical: 84
      }, 
      risk: "High", fatigue: 78, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/7.jpg",
      analysisReport: {
        summary: "Tireless worker in midfield showing signs of fatigue",
        strengths: ["Work rate", "Passing range", "Team coordination"],
        weaknesses: ["Currently experiencing high fatigue", "Vulnerable when isolated"],
        performance: 6.4,
        recommendedTraining: "Rest and recovery, followed by stamina maintenance"
      }
    },
    { id: 8, number: 10, name: "Salem Al-Dawsari", position: "CAM", baseX: 50, baseY: 40, x: 50, y: 40, vx: 0, vy: 0, 
      stats: { 
        speed: 88, stamina: 85, positioning: 90, passing: 91, tackling: 62, shooting: 82,
        height: 174, weight: 68, dribbling: 88, defending: 64, physical: 72
      }, 
      risk: "Medium", fatigue: 45, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/8.jpg",
      analysisReport: {
        summary: "Creative playmaker and team's primary chance creator",
        strengths: ["Vision", "Through balls", "Set pieces", "Finding space between lines"],
        weaknesses: ["Defensive contribution", "Physicality in duels"],
        performance: 8.7,
        recommendedTraining: "Resistance training to improve physical strength"
      }
    },
    { id: 9, number: 7, name: "Abdullah Al-Hamdan", position: "LW", baseX: 20, baseY: 30, x: 20, y: 30, vx: 0, vy: 0, 
      stats: { 
        speed: 94, stamina: 82, positioning: 84, passing: 78, tackling: 54, shooting: 87,
        height: 176, weight: 70, dribbling: 89, defending: 45, physical: 76
      }, 
      risk: "Medium", fatigue: 51, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/9.jpg",
      analysisReport: {
        summary: "Explosive winger with excellent dribbling skills",
        strengths: ["1v1 dribbling", "Pace on the counter", "Shooting from left side"],
        weaknesses: ["Defensive tracking", "Consistency over 90 minutes"],
        performance: 8.5,
        recommendedTraining: "Defensive positioning and tracking runners"
      }
    },
    { id: 10, number: 11, name: "Firas Al-Buraikan", position: "RW", baseX: 80, baseY: 30, x: 80, y: 30, vx: 0, vy: 0, 
      stats: { 
        speed: 95, stamina: 79, positioning: 82, passing: 74, tackling: 57, shooting: 89,
        height: 179, weight: 73, dribbling: 87, defending: 42, physical: 75
      }, 
      risk: "Low", fatigue: 38, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/10.jpg",
      analysisReport: {
        summary: "Fast and direct right winger with goal threat",
        strengths: ["Pace", "Finishing", "Counter-attacking threat"],
        weaknesses: ["Link-up play", "Defensive workrate"],
        performance: 7.6,
        recommendedTraining: "Team combination play in attack"
      }
    },
    { id: 11, number: 9, name: "Sami Al-Najei", position: "ST", baseX: 50, baseY: 15, x: 50, y: 15, vx: 0, vy: 0, 
      stats: { 
        speed: 86, stamina: 84, positioning: 92, passing: 81, tackling: 45, shooting: 94,
        height: 185, weight: 79, dribbling: 83, defending: 38, physical: 86
      }, 
      risk: "Medium", fatigue: 48, hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/11.jpg",
      analysisReport: {
        summary: "Clinical striker with excellent positioning",
        strengths: ["Finishing", "Movement in the box", "Aerial ability"],
        weaknesses: ["Creating own chances", "Hold-up play"],
        performance: 7.8,
        recommendedTraining: "Link-up play with midfielders"
      }
    },
  ]);

  // Substitutes bench
  const [substitutes, setSubstitutes] = useState([
    { id: 12, number: 12, name: "Faisal Al-Ghamdi", position: "GK", 
      stats: { 
        speed: 75, stamina: 88, positioning: 86, passing: 72, tackling: 40, shooting: 30,
        height: 189, weight: 84, dribbling: 40, defending: 86, physical: 83
      }, 
      risk: "Low", fatigue: 5, 
      imgUrl: "https://randomuser.me/api/portraits/men/12.jpg" 
    },
    { id: 13, number: 13, name: "Nawaf Al-Abid", position: "CB", 
      stats: { 
        speed: 79, stamina: 87, positioning: 85, passing: 75, tackling: 89, shooting: 43,
        height: 188, weight: 83, dribbling: 58, defending: 88, physical: 86
      }, 
      risk: "Low", fatigue: 10, 
      imgUrl: "https://randomuser.me/api/portraits/men/13.jpg" 
    },
    { id: 14, number: 14, name: "Muhannad Al-Shanqeeti", position: "CM", 
      stats: { 
        speed: 83, stamina: 90, positioning: 84, passing: 88, tackling: 76, shooting: 72,
        height: 180, weight: 75, dribbling: 80, defending: 75, physical: 78
      }, 
      risk: "Low", fatigue: 8, 
      imgUrl: "https://randomuser.me/api/portraits/men/14.jpg" 
    },
    { id: 15, number: 15, name: "Fahad Al-Mosaibeh", position: "LW", 
      stats: { 
        speed: 92, stamina: 85, positioning: 80, passing: 77, tackling: 52, shooting: 85,
        height: 175, weight: 70, dribbling: 86, defending: 48, physical: 72
      }, 
      risk: "Low", fatigue: 12, 
      imgUrl: "https://randomuser.me/api/portraits/men/15.jpg" 
    },
    { id: 16, number: 16, name: "Abdullah Al-Zoari", position: "RW", 
      stats: { 
        speed: 93, stamina: 80, positioning: 83, passing: 76, tackling: 55, shooting: 86,
        height: 177, weight: 71, dribbling: 88, defending: 50, physical: 74
      }, 
      risk: "Low", fatigue: 7, 
      imgUrl: "https://randomuser.me/api/portraits/men/16.jpg" 
    },
    { id: 17, number: 17, name: "Majed Hassan", position: "ST", 
      stats: { 
        speed: 88, stamina: 82, positioning: 89, passing: 78, tackling: 48, shooting: 91,
        height: 183, weight: 78, dribbling: 85, defending: 40, physical: 84
      }, 
      risk: "Low", fatigue: 6, 
      imgUrl: "https://randomuser.me/api/portraits/men/17.jpg" 
    },
    { id: 18, number: 18, name: "Ibrahim Al-Ghanim", position: "CDM", 
      stats: { 
        speed: 76, stamina: 92, positioning: 87, passing: 85, tackling: 88, shooting: 58,
        height: 181, weight: 77, dribbling: 72, defending: 89, physical: 87
      }, 
      risk: "Low", fatigue: 9, 
      imgUrl: "https://randomuser.me/api/portraits/men/18.jpg" 
    },
  ]);

  // Base opposition team players
  const [oppositionPlayers, setOppositionPlayers] = useState([
    { id: 101, number: 1, name: "Mohammed Al-Owais", position: "GK", baseX: 50, baseY: 15, x: 50, y: 15, vx: 0, vy: 0, 
      stats: { 
        speed: 76, stamina: 84, positioning: 87, passing: 73, tackling: 42, shooting: 30,
        height: 188, weight: 85, dribbling: 42, defending: 85, physical: 82
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/21.jpg" 
    },
    { id: 102, number: 3, name: "Ali Al-Bulaihi", position: "CB", baseX: 35, baseY: 30, x: 35, y: 30, vx: 0, vy: 0, 
      stats: { 
        speed: 80, stamina: 86, positioning: 88, passing: 75, tackling: 90, shooting: 45,
        height: 187, weight: 83, dribbling: 65, defending: 89, physical: 88
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/22.jpg" 
    },
    { id: 103, number: 5, name: "Abdulelah Al-Amri", position: "CB", baseX: 65, baseY: 30, x: 65, y: 30, vx: 0, vy: 0, 
      stats: { 
        speed: 82, stamina: 85, positioning: 87, passing: 76, tackling: 88, shooting: 42,
        height: 185, weight: 82, dribbling: 62, defending: 90, physical: 87
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/23.jpg" 
    },
    { id: 104, number: 2, name: "Sultan Al-Ghanam", position: "RB", baseX: 85, baseY: 30, x: 85, y: 30, vx: 0, vy: 0, 
      stats: { 
        speed: 87, stamina: 84, positioning: 80, passing: 78, tackling: 83, shooting: 56,
        height: 176, weight: 72, dribbling: 76, defending: 84, physical: 79
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/24.jpg" 
    },
    { id: 105, number: 13, name: "Saud Abdulhamid", position: "LB", baseX: 15, baseY: 30, x: 15, y: 30, vx: 0, vy: 0, 
      stats: { 
        speed: 85, stamina: 83, positioning: 79, passing: 77, tackling: 82, shooting: 55,
        height: 175, weight: 71, dribbling: 75, defending: 83, physical: 78
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/25.jpg" 
    },
    { id: 106, number: 16, name: "Nasser Al-Dawsari", position: "CDM", baseX: 35, baseY: 50, x: 35, y: 50, vx: 0, vy: 0, 
      stats: { 
        speed: 83, stamina: 88, positioning: 86, passing: 85, tackling: 87, shooting: 65,
        height: 180, weight: 76, dribbling: 81, defending: 86, physical: 84
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/26.jpg" 
    },
    { id: 107, number: 8, name: "Fahad Al-Muwallad", position: "CDM", baseX: 65, baseY: 50, x: 65, y: 50, vx: 0, vy: 0, 
      stats: { 
        speed: 88, stamina: 91, positioning: 84, passing: 86, tackling: 85, shooting: 72,
        height: 178, weight: 75, dribbling: 83, defending: 82, physical: 80
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/27.jpg" 
    },
    { id: 108, number: 10, name: "Mohammed Kanno", position: "CAM", baseX: 50, baseY: 60, x: 50, y: 60, vx: 0, vy: 0, 
      stats: { 
        speed: 85, stamina: 89, positioning: 88, passing: 90, tackling: 78, shooting: 80,
        height: 182, weight: 77, dribbling: 87, defending: 76, physical: 88
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/28.jpg" 
    },
    { id: 109, number: 7, name: "Salman Al-Faraj", position: "LW", baseX: 20, baseY: 70, x: 20, y: 70, vx: 0, vy: 0, 
      stats: { 
        speed: 82, stamina: 85, positioning: 90, passing: 92, tackling: 65, shooting: 79,
        height: 179, weight: 73, dribbling: 85, defending: 70, physical: 78
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/29.jpg" 
    },
    { id: 110, number: 11, name: "Salem Al-Dawsari", position: "RW", baseX: 80, baseY: 70, x: 80, y: 70, vx: 0, vy: 0, 
      stats: { 
        speed: 90, stamina: 87, positioning: 89, passing: 85, tackling: 65, shooting: 88,
        height: 174, weight: 68, dribbling: 92, defending: 60, physical: 75
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/30.jpg" 
    },
    { id: 111, number: 9, name: "Firas Al-Buraikan", position: "ST", baseX: 50, baseY: 85, x: 50, y: 85, vx: 0, vy: 0, 
      stats: { 
        speed: 87, stamina: 82, positioning: 90, passing: 75, tackling: 48, shooting: 93,
        height: 184, weight: 78, dribbling: 82, defending: 40, physical: 85
      },
      hasBall: false, isActive: false, 
      imgUrl: "https://randomuser.me/api/portraits/men/31.jpg" 
    },
  ]);

  // AI tactical suggestions
  const suggestions = [
    "Switch to a 4-3-3 formation to exploit opponent's slow right-back",
    "Player #7 (Al-Shahrani) sprint speed drops by 20% after 70 minutes—substitute earlier",
    "Increase pressing intensity in opponent's defensive third",
    "Left flank concedes 30% more goals during counterattacks - reinforce defensive transition",
    "Recommendation: Practice set-piece routine #3 targeting Player #5 (Al-Otaibi)"
  ];

  // Match scenarios for simulation
  const matchScenarios = [
    { time: 12, event: "Chance created by Al-Dawsari (#10) - Shot on target", homeAction: true, play: "counterAttack" },
    { time: 18, event: "Opposition counter-attack through right flank - Defensive vulnerability exposed", homeAction: false },
    { time: 24, event: "Al-Najei (#9) scores! Great assist from Al-Dawsari", homeAction: true, goal: true, play: "wideAttack" },
    { time: 35, event: "Dangerous free-kick conceded near the box", homeAction: false },
    { time: 43, event: "Yellow card for Al-Harbi (#4) - Tactical foul", homeAction: true },
    { time: 52, event: "Opposition equalizes - Defensive marking needs adjustment", homeAction: false, goal: true },
    { time: 65, event: "Al-Shahrani (#7) fatigue critical - AI recommends substitution", homeAction: true, alert: true, substitution: { out: 7, in: 18 } },
    { time: 73, event: "Corner kick opportunity - AI suggests routine #2", homeAction: true, play: "possessionBuild" },
    { time: 78, event: "Al-Buraikan (#11) scores! Header from corner", homeAction: true, goal: true },
    { time: 88, event: "Opposition pressing intensifies - Maintain possession", homeAction: false, play: "defensiveBlock" },
  ];

  // Simulation insights and results
  const simulationInsights = {
    matchResult: { homeScore: 2, awayScore: 1, possession: { home: 58, away: 42 } },
    keyStats: {
      shots: { home: 15, away: 8 },
      shotsOnTarget: { home: 7, away: 3 },
      corners: { home: 6, away: 4 },
      fouls: { home: 10, away: 12 },
      offsides: { home: 2, away: 3 },
      yellowCards: { home: 1, away: 2 },
      passAccuracy: { home: 86, away: 79 }
    },
    tacticalInsights: [
      "Al-Hilal's 4-2-3-1 formation provided good control in midfield, but left flanks vulnerable to counter-attacks",
      "The high press was effective in opponent's half, forcing 8 turnovers in dangerous areas",
      "Al-Nassr struggled to break through the central areas but found space behind Al-Hilal's full-backs during transitions",
      "Substitution of Al-Shahrani at 65 minutes was crucial in maintaining defensive stability"
    ],
    playerInsights: [
      "Al-Dawsari was the key playmaker with 5 chances created and 1 assist",
      "Al-Najei's intelligent movement in the box created space for teammates",
      "Al-Shahrani showed signs of fatigue after 55 minutes, reducing defensive coverage",
      "Al-Buraikan's pace on the counter was a constant threat"
    ],
    weaknesses: [
      "Right defensive flank vulnerable to counter-attacks (3 chances conceded)",
      "Central midfield gaps when both CDMs press simultaneously",
      "Defensive transition after set pieces (2 dangerous counters conceded)",
      "Striker isolated during long periods of opposition possession"
    ],
    strengths: [
      "Effective build-up play through central midfielders",
      "Strong aerial presence on set pieces (1 goal, 2 additional chances)",
      "Quick transitions from defense to attack through the left wing",
      "Coordinated high pressing forcing opposition errors"
    ],
    recommendedImprovements: [
      "Practice defensive transitions with focus on full-back positioning",
      "Develop coordinated pressing triggers for midfield unit",
      "Work on quicker ball circulation to exploit opponent's defensive gaps",
      "Implement more varied corner routines targeting Al-Najei at the near post"
    ],
    vulnerabilities: {
      defensive: [
        { zone: "Right flank", issue: "Space behind full-back during transitions", priority: "High" },
        { zone: "Central channel", issue: "Gaps between defensive and midfield lines", priority: "Medium" },
        { zone: "Set pieces", issue: "Marking assignments on corner kicks", priority: "Medium" }
      ],
      attacking: [
        { zone: "Final third", issue: "Limited creativity against packed defenses", priority: "Medium" },
        { zone: "Striker support", issue: "Limited options for Al-Najei when isolated", priority: "Medium" }
      ]
    },
    keyChances: [
      { minute: 12, team: "home", player: "Al-Dawsari", type: "Shot", outcome: "Saved", xG: 0.35 },
      { minute: 24, team: "home", player: "Al-Najei", type: "Goal", outcome: "Scored", xG: 0.68 },
      { minute: 31, team: "away", player: "Al-Faraj", type: "Shot", outcome: "Missed", xG: 0.42 },
      { minute: 52, team: "away", player: "Al-Buraikan", type: "Goal", outcome: "Scored", xG: 0.76 },
      { minute: 78, team: "home", player: "Al-Buraikan", type: "Goal", outcome: "Scored", xG: 0.58 }
    ]
  };

  // Training recommendations
  const trainingRecommendations = [
    { 
      title: "Defensive Transition Recovery", 
      priority: "High", 
      description: "Focus on right-side defensive transitions with coordinated recovery runs", 
      drillType: "11v11 transition game",
      targetPlayers: ["Fahad Al-Muwallad", "Omar Al-Harbi", "Mohammed Al-Sahlawi"],
      expectedImprovement: "30% reduction in counter-attack vulnerability"
    },
    { 
      title: "Set Piece Organization", 
      priority: "Medium", 
      description: "Improve defensive organization on opposition corners", 
      drillType: "Set-piece specific training",
      targetPlayers: ["Team defensive unit"],
      expectedImprovement: "25% reduction in set-piece chances conceded"
    },
    { 
      title: "High Press Coordination", 
      priority: "High", 
      description: "Develop synchronized pressing triggers and cover positions", 
      drillType: "Pressing exercises with defined triggers",
      targetPlayers: ["Midfield and attacking units"],
      expectedImprovement: "40% increase in opposition turnovers in attacking third"
    },
    { 
      title: "Build-up Against High Press", 
      priority: "Medium", 
      description: "Improve positional rotations to bypass opponent's pressing", 
      drillType: "Position play exercises in tight spaces",
      targetPlayers: ["Defensive and midfield units"],
      expectedImprovement: "35% increase in successful progressions past opponent's first line"
    }
  ];

  // Auto-fill team information
  const handleAutoFill = (team) => {
    setAutoFilling(true);
    setAutoFillTeam(team);
    setAutoFillProgress(0);
    
    // Simulate data fetching with progress updates
    const interval = setInterval(() => {
      setAutoFillProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Populate data based on which team is being auto-filled
          if (team === 'home') {
            // Home team data is already populated in the state
            setNotifications(prev => [
              ...prev,
              {
                id: Date.now(),
                show: true,
                message: `Successfully loaded ${teamName} team data with 11 players and 7 substitutes`,
                type: "success"
              }
            ]);
          } else {
            // Opposition team data is already populated in the state
            setNotifications(prev => [
              ...prev,
              {
                id: Date.now(),
                show: true,
                message: `Successfully loaded ${opponentName} team data with 11 players`,
                type: "success"
              }
            ]);
          }
          
          setAutoFilling(false);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  // Create AI agents for players
  const createAgents = () => {
    setProcessingAgents(true);
    setAgentsCreated(0);
    
    // Simulate agent creation with progress updates
    const totalPlayers = players.length + oppositionPlayers.length;
    let currentPlayer = 0;
    
    const interval = setInterval(() => {
      currentPlayer++;
      setAgentsCreated(currentPlayer);
      
      if (currentPlayer >= totalPlayers) {
        clearInterval(interval);
        
        setNotifications(prev => [
          ...prev,
          {
            id: Date.now(),
            show: true,
            message: `AI Agents successfully created for all ${totalPlayers} players`,
            type: "success"
          }
        ]);
        
        setTimeout(() => {
          setProcessingAgents(false);
          setCurrentPage('simulation');
        }, 1000);
      }
    }, 150);
  };
  
  // Start the simulation
  const startSimulation = () => {
    // Show initial notifications
    setNotifications([
      {
        id: 1, 
        show: true, 
        message: "Simulation started - analyzing team tactics and player movements", 
        type: "info"
      },
      {
        id: 2, 
        show: true, 
        message: "AI models loaded for all 22 players with reinforcement learning capabilities", 
        type: "info"
      }
    ]);
    
    setSimulationRunning(true);
    setSimulationProgress(0);
    
    // Reset match state
    setSimulationTime(0);
    setScore({ home: 0, away: 0 });
    setMatchEvents([]);
    setPossession({ home: 60, away: 40 });
    
    // Simulate progressing through a match with simulation progress
    const progressInterval = setInterval(() => {
      setSimulationProgress(prev => {
        const newProgress = prev + 1;
        
        // Add match events at specific progress points
        if (matchScenarios.find(s => Math.floor(s.time / 90 * 100) === newProgress)) {
          const scenario = matchScenarios.find(s => Math.floor(s.time / 90 * 100) === newProgress);
          processMatchScenario(scenario);
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          finishSimulation();
          return 100;
        }
        return newProgress;
      });
    }, 150);
    
    // Set simulation time in sync with progress
    const timeInterval = setInterval(() => {
      setSimulationTime(prev => {
        if (prev >= 90) {
          clearInterval(timeInterval);
          return 90;
        }
        return prev + 1;
      });
    }, 150 * 90 / 100);
  };

  // Process a match scenario event
  const processMatchScenario = (scenario) => {
    // Add to match events
    setMatchEvents(prev => [scenario, ...prev]);
    
    // Handle goals
    if (scenario.goal) {
      if (scenario.homeAction) {
        setScore(prev => ({ ...prev, home: prev.home + 1 }));
      } else {
        setScore(prev => ({ ...prev, away: prev.away + 1 }));
      }
      
      // Add notification
      setNotifications(prev => [
        ...prev,
        {
          id: Date.now(),
          show: true,
          message: scenario.event,
          type: scenario.homeAction ? "success" : "danger"
        }
      ]);
    }
    
    // Handle alerts
    if (scenario.alert) {
      setNotifications(prev => [
        ...prev,
        {
          id: Date.now(),
          show: true,
          message: scenario.event,
          type: "warning"
        }
      ]);
    }
  };
  
  // Finish the simulation and prepare results
  const finishSimulation = () => {
    setSimulationComplete(true);
    setSimulationRunning(false);
    setSimulationResult(simulationInsights);
    
    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        show: true,
        message: `Simulation complete! Final score: ${teamName} ${simulationInsights.matchResult.homeScore} - ${simulationInsights.matchResult.awayScore} ${opponentName}`,
        type: "success"
      }
    ]);

    // Move to report page after simulation is complete
    setTimeout(() => {
      setCurrentPage('report');
    }, 1500);
  };
  
  // Remove a notification
  const removeNotification = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, show: false} : notif
    ));
  };
  
  // Initialize with welcome notification
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        show: true,
        message: "Welcome to TactiVision AURA - Agent Unified Resource Architecture for Football Simulation",
        type: "info"
      }
    ]);
  }, []);

  // Top Navigation Bar Component
  const NavigationBar = () => (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 flex justify-between items-center border-b border-gray-700 shadow-md">
      <div className="flex items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            TactiVision <span className="text-green-400">AURA</span>
          </h1>
          <span className="ml-3 text-xs bg-blue-900 px-2 py-1 rounded-full">Agent Unified Resource Architecture</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm bg-gradient-to-r from-blue-800 to-blue-600 px-3 py-1 rounded-full flex items-center shadow-lg">
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          {currentPage === 'welcome' ? 'Welcome' : 
           currentPage === 'team-setup' ? 'Team Setup' : 
           currentPage === 'opponent-setup' ? 'Opponent Setup' : 
           currentPage === 'ai-agents' ? 'AI Agent Creation' : 
           currentPage === 'simulation' ? 'Match Simulation' : 
           currentPage === 'report' ? 'Simulation Report' : 'Dashboard'}
        </span>
        <div className="relative">
          <button className="p-2 rounded hover:bg-gray-700 transition-colors duration-200 relative focus:outline-none focus:ring-2 focus:ring-blue-500">
            <Bell size={20} />
            {notifications.filter(n => n.show).length > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-gray-800 animate-pulse"></span>
            )}
          </button>
        </div>
        <button className="p-2 rounded hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Settings size={20} />
        </button>
        <div className="relative inline-flex items-center p-1">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Coach Profile" 
            className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-gray-900"></span>
        </div>
      </div>
    </div>
  );

  // Notifications Component
  const NotificationsPanel = () => (
    <div className="fixed top-16 right-4 w-80 z-50 space-y-2">
      {notifications.filter(n => n.show).map((notification) => (
        <div 
          key={notification.id} 
          className={`px-4 py-3 rounded-lg shadow-lg flex items-center justify-between animate-slideInDown ${
            notification.type === 'danger' ? 'bg-gradient-to-r from-red-600 to-red-500' : 
            notification.type === 'warning' ? 'bg-gradient-to-r from-yellow-600 to-yellow-500' : 
            notification.type === 'success' ? 'bg-gradient-to-r from-green-600 to-green-500' :
            notification.type === 'info' ? 'bg-gradient-to-r from-blue-600 to-blue-500' :
            'bg-gradient-to-r from-blue-600 to-blue-500'
          } text-white`}
        >
          <div className="flex items-center">
            {notification.type === 'danger' ? (
              <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
            ) : notification.type === 'warning' ? (
              <Bell size={16} className="mr-2 flex-shrink-0" />
            ) : notification.type === 'success' ? (
              <CheckCircle size={16} className="mr-2 flex-shrink-0" />
            ) : (
              <Bell size={16} className="mr-2 flex-shrink-0" />
            )}
            <span className="text-sm">{notification.message}</span>
          </div>
          <button 
            className="ml-2 text-white opacity-80 hover:opacity-100 transition-opacity duration-200"
            onClick={() => removeNotification(notification.id)}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );

  // Page Components
  const WelcomePage = () => (
    <div className="flex-1 flex items-center justify-center bg-gray-900 p-5 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl max-w-3xl w-full p-6 border border-gray-700">
        {/* 1. Center the Icon at the top */}
        

        {/* 2. Center the Text Block */}
        <div className="text-center mb-6"> {/* This div now takes full width and centers its text content */}
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            Welcome to TactiVision AURA
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto"> {/* mx-auto centers the paragraph block if narrower than parent */}
            Agent Unified Resource Architecture for football tactics simulation using reinforcement learning to test strategies in virtual environments.
          </p>
        </div>

        <div className="border-t border-gray-700 my-4 pt-4">
          <h2 className="text-xl font-bold mb-4 text-blue-400">What problem are we solving?</h2>
          <div className="bg-gray-800 p-4 rounded-lg mb-4 text-gray-300">
            <p className="italic">
              "Soccer coaches lack effective tools to test tactics in real match conditions without risking player injuries or leaking strategies to competitors. Current approaches force a choice between theoretical analysis that fails to capture match complexity or physical practices with energy and time limitations, creating a critical gap between tactical planning and confident implementation."
            </p>
          </div>
          
          <h2 className="text-xl font-bold mb-3 text-blue-400">How AURA Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center mb-2">
                <Briefcase size={24} className="mr-2 text-green-400" />
                <h3 className="font-bold">Setup Teams</h3>
              </div>
              <p className="text-sm text-gray-400">Input your team and opponent information with detailed player attributes and tactical setups.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-2">
                <Brain size={24} className="mr-2 text-blue-400" />
                <h3 className="font-bold">AI Agents</h3>
              </div>
              <p className="text-sm text-gray-400">Create AI agents that model each player's behavior and decision-making using reinforcement learning.</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center mb-2">
                <Activity size={24} className="mr-2 text-purple-400" />
                <h3 className="font-bold">Simulate & Analyze</h3>
              </div>
              <p className="text-sm text-gray-400">Run full match simulations and receive detailed insights on strengths, weaknesses, and recommendations.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            className="py-3 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-full flex items-center transition-all duration-300 shadow-lg transform hover:scale-105"
            onClick={() => setCurrentPage('team-setup')}
          >
            <Zap size={20} className="mr-2" />
            Start Setting Up Your Simulation
          </button>
        </div>
      </div>
    </div>
  );

  const TeamSetupPage = () => (
    <div className="flex-1 bg-gray-900 p-5 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl max-w-5xl mx-auto p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Team Setup</h1>
            <p className="text-gray-400">Configure your team's information, formations, and player attributes</p>
          </div>
          <div className="flex space-x-3">
            <div className="text-xs bg-blue-900 text-blue-200 py-1 px-3 rounded-full flex items-center">
              <span className="bg-white text-blue-900 w-5 h-5 rounded-full inline-flex items-center justify-center font-bold mr-2">1</span>
              Team Setup
            </div>
            <div className="text-xs bg-gray-700 text-gray-400 py-1 px-3 rounded-full flex items-center">
              <span className="bg-gray-500 text-gray-800 w-5 h-5 rounded-full inline-flex items-center justify-center font-bold mr-2">2</span>
              Opponent Setup
            </div>
            <div className="text-xs bg-gray-700 text-gray-400 py-1 px-3 rounded-full flex items-center">
              <span className="bg-gray-500 text-gray-800 w-5 h-5 rounded-full inline-flex items-center justify-center font-bold mr-2">3</span>
              AI Agents
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Information Section */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
              <Users className="mr-2" size={20} />
              Team Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Team Name</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={teamName} 
                    onChange={(e) => setTeamName(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your team name"
                  />
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r flex items-center transition-colors duration-200"
                    onClick={() => handleAutoFill('home')}
                    disabled={autoFilling}
                  >
                    {autoFilling && autoFillTeam === 'home' ? (
                      <div className="flex items-center">
                        <RefreshCw size={16} className="animate-spin mr-1" />
                        <span className="text-sm">{autoFillProgress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Search size={16} className="mr-1" />
                        <span className="text-sm">Auto-fill</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Formation</label>
                  <select 
                    value={formationChoice} 
                    onChange={(e) => setFormationChoice(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="4-2-3-1">4-2-3-1</option>
                    <option value="4-3-3">4-3-3</option>
                    <option value="3-5-2">3-5-2</option>
                    <option value="4-4-2">4-4-2</option>
                    <option value="5-3-2">5-3-2</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Playing Style</label>
                  <select 
                    value={playingStyle} 
                    onChange={(e) => setPlayingStyle(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="possession">Possession</option>
                    <option value="counter-attack">Counter-attack</option>
                    <option value="tiki-taka">Tiki-taka</option>
                    <option value="high-press">High Press</option>
                    <option value="defensive">Defensive</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-bold text-gray-300 mb-2">Formation Preview</h3>
                <div className="relative h-60 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600">
                  {/* Field markings */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                  <div className="absolute rounded-full border border-white opacity-20"
                       style={{width: '14%', height: '14%', left: '43%', top: '43%'}}></div>
                  <div className="absolute bottom-0 left-1/3 right-1/3 h-1/6 border border-white opacity-20"></div>
                  <div className="absolute top-0 left-1/3 right-1/3 h-1/6 border border-white opacity-20"></div>
                  
                  {/* Display players on the field */}
                  {formationChoice === '4-2-3-1' && players.slice(0, 11).map(player => (
                    <div 
                      key={player.id}
                      className="absolute w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white shadow-lg hover:scale-110 transition-transform duration-200"
                      style={{left: `${player.baseX}%`, top: `${player.baseY}%`}}
                    >
                      <img 
                        src={player.imgUrl} 
                        alt={player.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center text-xs text-white border border-blue-500">
                        {player.number}
                      </div>
                      <div className="absolute w-16 text-center -bottom-6 left-1/2 transform -translate-x-1/2">
                        <span className="text-white text-xs bg-blue-800 px-1 rounded shadow-md">{player.position}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Players Section */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
              <User className="mr-2" size={20} />
              Players
            </h2>
            
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="bg-gray-700 p-3 rounded-lg mb-3">
                <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Starting XI
                </h3>
                <div className="space-y-2">
                  {players.slice(0, 11).map(player => (
                    <div key={player.id} className="bg-gray-800 p-2 rounded flex items-center hover:bg-gray-700 transition-colors duration-200">
                      <div className="mr-3 relative">
                        <img 
                          src={player.imgUrl} 
                          alt={player.name} 
                          className="w-10 h-10 rounded-full object-cover border border-blue-500"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{player.number}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{player.name}</span>
                          <span className="text-xs bg-blue-900 px-2 py-0.5 rounded-full">{player.position}</span>
                        </div>
                        <div className="flex items-center mt-1 space-x-2 text-xs text-gray-400">
                          <span>{player.stats.height}cm</span>
                          <span>•</span>
                          <span>{player.stats.weight}kg</span>
                          <span className="flex-1"></span>
                          <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                            Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-5 gap-1 mt-1">
                          <div>
                            <div className="text-xs text-gray-400">SPD</div>
                            <div className={`text-xs font-bold ${player.stats.speed > 85 ? 'text-green-400' : player.stats.speed > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.speed}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">SHT</div>
                            <div className={`text-xs font-bold ${player.stats.shooting > 85 ? 'text-green-400' : player.stats.shooting > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.shooting}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">PAS</div>
                            <div className={`text-xs font-bold ${player.stats.passing > 85 ? 'text-green-400' : player.stats.passing > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.passing}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">DRB</div>
                            <div className={`text-xs font-bold ${player.stats.dribbling > 85 ? 'text-green-400' : player.stats.dribbling > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.dribbling}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">DEF</div>
                            <div className={`text-xs font-bold ${player.stats.defending > 85 ? 'text-green-400' : player.stats.defending > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.defending}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Substitutes
                </h3>
                <div className="space-y-2">
                  {substitutes.slice(0, 7).map(player => (
                    <div key={player.id} className="bg-gray-800 p-2 rounded flex items-center hover:bg-gray-700 transition-colors duration-200">
                      <div className="mr-3 relative">
                        <img 
                          src={player.imgUrl} 
                          alt={player.name} 
                          className="w-10 h-10 rounded-full object-cover border border-yellow-500"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-yellow-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{player.number}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                        <span className="font-bold">{player.name}</span>
                          <span className="text-xs bg-yellow-900 px-2 py-0.5 rounded-full">{player.position}</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1 mt-1">
                          <div>
                            <div className="text-xs text-gray-400">SPD</div>
                            <div className={`text-xs font-bold ${player.stats.speed > 85 ? 'text-green-400' : player.stats.speed > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.speed}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">SHT</div>
                            <div className={`text-xs font-bold ${player.stats.shooting > 85 ? 'text-green-400' : player.stats.shooting > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.shooting}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">PAS</div>
                            <div className={`text-xs font-bold ${player.stats.passing > 85 ? 'text-green-400' : player.stats.passing > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.passing}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">DRB</div>
                            <div className={`text-xs font-bold ${player.stats.dribbling > 85 ? 'text-green-400' : player.stats.dribbling > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.dribbling}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">DEF</div>
                            <div className={`text-xs font-bold ${player.stats.defending > 85 ? 'text-green-400' : player.stats.defending > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.defending}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center mt-2">
                    <button className="bg-gray-900 hover:bg-gray-800 text-blue-400 py-1 px-3 rounded-full text-sm flex items-center transition-colors duration-200">
                      <PlusCircle size={14} className="mr-1" /> Add Substitute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center transition-colors duration-200"
            onClick={() => setCurrentPage('welcome')}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back
          </button>
          <button 
            className="py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded flex items-center transition-colors duration-200"
            onClick={() => setCurrentPage('opponent-setup')}
          >
            Continue
            <ArrowRight className="ml-1" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const OpponentSetupPage = () => (
    <div className="flex-1 bg-gray-900 p-5 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl max-w-5xl mx-auto p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Opponent Setup</h1>
            <p className="text-gray-400">Configure your opponent's information, formations, and player attributes</p>
          </div>
          <div className="flex space-x-3">
            <div className="text-xs bg-gray-700 text-gray-400 py-1 px-3 rounded-full flex items-center">
              <CheckCircle size={14} className="mr-2 text-green-500" />
              Team Setup
            </div>
            <div className="text-xs bg-blue-900 text-blue-200 py-1 px-3 rounded-full flex items-center">
              <span className="bg-white text-blue-900 w-5 h-5 rounded-full inline-flex items-center justify-center font-bold mr-2">2</span>
              Opponent Setup
            </div>
            <div className="text-xs bg-gray-700 text-gray-400 py-1 px-3 rounded-full flex items-center">
              <span className="bg-gray-500 text-gray-800 w-5 h-5 rounded-full inline-flex items-center justify-center font-bold mr-2">3</span>
              AI Agents
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Opponent Information Section */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-red-400 flex items-center">
              <Users className="mr-2" size={20} />
              Opponent Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Team Name</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={opponentName} 
                    onChange={(e) => setOpponentName(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-l px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter opponent team name"
                  />
                  <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r flex items-center transition-colors duration-200"
                    onClick={() => handleAutoFill('away')}
                    disabled={autoFilling}
                  >
                    {autoFilling && autoFillTeam === 'away' ? (
                      <div className="flex items-center">
                        <RefreshCw size={16} className="animate-spin mr-1" />
                        <span className="text-sm">{autoFillProgress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Search size={16} className="mr-1" />
                        <span className="text-sm">Auto-fill</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Formation</label>
                  <select 
                    value={opponentFormation} 
                    onChange={(e) => setOpponentFormation(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="4-3-3">4-3-3</option>
                    <option value="4-2-3-1">4-2-3-1</option>
                    <option value="3-5-2">3-5-2</option>
                    <option value="4-4-2">4-4-2</option>
                    <option value="5-3-2">5-3-2</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1">Playing Style</label>
                  <select 
                    value={opponentStyle} 
                    onChange={(e) => setOpponentStyle(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="counter-attack">Counter-attack</option>
                    <option value="possession">Possession</option>
                    <option value="tiki-taka">Tiki-taka</option>
                    <option value="high-press">High Press</option>
                    <option value="defensive">Defensive</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-bold text-gray-300 mb-2">Formation Preview</h3>
                <div className="relative h-60 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600">
                  {/* Field markings */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                  <div className="absolute rounded-full border border-white opacity-20"
                       style={{width: '14%', height: '14%', left: '43%', top: '43%'}}></div>
                  <div className="absolute bottom-0 left-1/3 right-1/3 h-1/6 border border-white opacity-20"></div>
                  <div className="absolute top-0 left-1/3 right-1/3 h-1/6 border border-white opacity-20"></div>
                  
                  {/* Display players on the field - flipped for opponent view */}
                  {oppositionPlayers.slice(0, 11).map(player => (
                    <div 
                      key={player.id}
                      className="absolute w-9 h-9 bg-red-500 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white shadow-lg hover:scale-110 transition-transform duration-200"
                      style={{left: `${player.baseX}%`, top: `${player.baseY}%`}}
                    >
                      <img 
                        src={player.imgUrl} 
                        alt={player.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center text-xs text-white border border-red-500">
                        {player.number}
                      </div>
                      <div className="absolute w-16 text-center -bottom-6 left-1/2 transform -translate-x-1/2">
                        <span className="text-white text-xs bg-red-800 px-1 rounded shadow-md">{player.position}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Opponent Players Section */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-red-400 flex items-center">
              <User className="mr-2" size={20} />
              Opponent Players
            </h2>
            
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="bg-gray-700 p-3 rounded-lg mb-3">
                <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Starting XI
                </h3>
                <div className="space-y-2">
                  {oppositionPlayers.slice(0, 11).map(player => (
                    <div key={player.id} className="bg-gray-800 p-2 rounded flex items-center hover:bg-gray-700 transition-colors duration-200">
                      <div className="mr-3 relative">
                        <img 
                          src={player.imgUrl} 
                          alt={player.name} 
                          className="w-10 h-10 rounded-full object-cover border border-red-500"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{player.number}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">{player.name}</span>
                          <span className="text-xs bg-red-900 px-2 py-0.5 rounded-full">{player.position}</span>
                        </div>
                        <div className="flex items-center mt-1 space-x-2 text-xs text-gray-400">
                          <span>{player.stats.height}cm</span>
                          <span>•</span>
                          <span>{player.stats.weight}kg</span>
                          <span className="flex-1"></span>
                          <button className="text-red-400 hover:text-red-300 transition-colors duration-200">
                            Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-5 gap-1 mt-1">
                          <div>
                            <div className="text-xs text-gray-400">SPD</div>
                            <div className={`text-xs font-bold ${player.stats.speed > 85 ? 'text-green-400' : player.stats.speed > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.speed}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">SHT</div>
                            <div className={`text-xs font-bold ${player.stats.shooting > 85 ? 'text-green-400' : player.stats.shooting > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.shooting}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">PAS</div>
                            <div className={`text-xs font-bold ${player.stats.passing > 85 ? 'text-green-400' : player.stats.passing > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.passing}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">DRB</div>
                            <div className={`text-xs font-bold ${player.stats.dribbling > 85 ? 'text-green-400' : player.stats.dribbling > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.dribbling}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">DEF</div>
                            <div className={`text-xs font-bold ${player.stats.defending > 85 ? 'text-green-400' : player.stats.defending > 70 ? 'text-yellow-400' : 'text-red-400'}`}>{player.stats.defending}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-3">
                <button className="bg-gray-900 hover:bg-gray-800 text-red-400 py-1 px-3 rounded-full text-sm flex items-center transition-colors duration-200">
                  <Upload size={14} className="mr-1" /> Import Team Data
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center transition-colors duration-200"
            onClick={() => setCurrentPage('team-setup')}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back
          </button>
          <button 
            className="py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded flex items-center transition-colors duration-200"
            onClick={() => setCurrentPage('ai-agents')}
          >
            Continue
            <ArrowRight className="ml-1" size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const AIAgentsPage = () => (
    <div className="flex-1 bg-gray-900 p-5 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl max-w-5xl mx-auto p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">AI Agents Creation</h1>
            <p className="text-gray-400">Create AI agents for all players using reinforcement learning models</p>
          </div>
          <div className="flex space-x-3">
            <div className="text-xs bg-gray-700 text-gray-400 py-1 px-3 rounded-full flex items-center">
              <CheckCircle size={14} className="mr-2 text-green-500" />
              Team Setup
            </div>
            <div className="text-xs bg-gray-700 text-gray-400 py-1 px-3 rounded-full flex items-center">
              <CheckCircle size={14} className="mr-2 text-green-500" />
              Opponent Setup
            </div>
            <div className="text-xs bg-blue-900 text-blue-200 py-1 px-3 rounded-full flex items-center">
              <span className="bg-white text-blue-900 w-5 h-5 rounded-full inline-flex items-center justify-center font-bold mr-2">3</span>
              AI Agents
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* AI Models Selection */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-purple-400 flex items-center">
              <Brain className="mr-2" size={20} />
              AI Model Selection
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-700 p-3 rounded-lg border-2 border-purple-500">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white">Advanced RL</h3>
                  <div className="bg-purple-900 text-purple-200 px-2 py-1 rounded-full text-xs">Recommended</div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Deep reinforcement learning with precise player movement patterns and decision making.
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Complex decision trees
                  </li>
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Adaptive behavior
                  </li>
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Player-specific modeling
                  </li>
                </ul>
                <div className="mt-3 flex justify-center">
                  <div className="bg-purple-900 px-3 py-1 rounded text-xs">
                    <span className="font-bold">Computation: </span>
                    <span className="text-purple-200">High</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white">Standard RL</h3>
                  <div className="bg-blue-900 text-blue-200 px-2 py-1 rounded-full text-xs">Balanced</div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Balanced reinforcement learning with good accuracy for typical match scenarios.
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Position-based behavior
                  </li>
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Tactical awareness
                  </li>
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Role-based decision making
                  </li>
                </ul>
                <div className="mt-3 flex justify-center">
                  <div className="bg-blue-900 px-3 py-1 rounded text-xs">
                    <span className="font-bold">Computation: </span>
                    <span className="text-blue-200">Medium</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-white">Basic RL</h3>
                  <div className="bg-green-900 text-green-200 px-2 py-1 rounded-full text-xs">Fast</div>
                </div>
                <p className="text-sm text-gray-300 mt-2">
                  Simplified reinforcement learning for quick simulation with fundamental behaviors.
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Basic movement patterns
                  </li>
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Simplified decision making
                  </li>
                  <li className="text-xs text-gray-400 flex items-center">
                    <CheckCircle size={12} className="mr-1 text-green-400" /> Low computational requirements
                  </li>
                </ul>
                <div className="mt-3 flex justify-center">
                  <div className="bg-green-900 px-3 py-1 rounded text-xs">
                    <span className="font-bold">Computation: </span>
                    <span className="text-green-200">Low</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-bold text-gray-300 mb-2">Advanced Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Learning Rate</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0.001"
                      max="0.1"
                      step="0.001"
                      defaultValue="0.01"
                      className="flex-1 mr-2"
                    />
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded">0.01</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Exploration Rate</label>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0.05"
                      max="0.5"
                      step="0.05"
                      defaultValue="0.2"
                      className="flex-1 mr-2"
                    />
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded">0.2</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Network Complexity</label>
                  <select 
                    defaultValue="medium"
                    className="bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="low">Low (Faster)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="high">High (More Accurate)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Reward Shaping</label>
                  <select 
                    defaultValue="balanced"
                    className="bg-gray-800 border border-gray-600 rounded px-2 py-1 w-full text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="defensive">Defensive Priority</option>
                    <option value="balanced">Balanced</option>
                    <option value="offensive">Offensive Priority</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent Creation Process */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-purple-400 flex items-center">
              <Cpu className="mr-2" size={20} />
              Agent Creation Process
            </h2>
            
            {processingAgents ? (
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-white">Creating AI Agents</h3>
                    <div className="text-purple-400">{agentsCreated} of {players.length + oppositionPlayers.length}</div>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full"
                      style={{ width: `${(agentsCreated / (players.length + oppositionPlayers.length)) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg mb-3 max-h-48 overflow-y-auto custom-scrollbar">
                    <div className="font-mono text-xs text-green-400 space-y-1">
                      <div className="flex">
                        <span className="mr-2 opacity-50">[INFO]</span>
                        <span>Initializing reinforcement learning models...</span>
                      </div>
                      <div className="flex">
                        <span className="mr-2 opacity-50">[INFO]</span>
                        <span>Loading player attribute data...</span>
                      </div>
                      <div className="flex">
                        <span className="mr-2 opacity-50">[INFO]</span>
                        <span>Building neural network architecture for player agents...</span>
                      </div>
                      <div className="flex">
                        <span className="mr-2 opacity-50">[INFO]</span>
                        <span>Configuring decision policies based on player roles...</span>
                      </div>
                      <div className="flex">
                        <span className="mr-2 opacity-50">[INFO]</span>
                        <span>Mapping tactical instructions to reward functions...</span>
                      </div>
                      {agentsCreated >= 1 && (
                        <div className="flex">
                          <span className="mr-2 opacity-50">[INFO]</span>
                          <span>Creating agent for Ahmed Al-Khabari (GK)...</span>
                        </div>
                      )}
                      {agentsCreated >= 2 && (
                        <div className="flex">
                          <span className="mr-2 opacity-50">[INFO]</span>
                          <span>Creating agent for Omar Al-Harbi (CB)...</span>
                        </div>
                      )}
                      {agentsCreated >= 3 && (
                        <div className="flex">
                          <span className="mr-2 opacity-50">[INFO]</span>
                          <span>Creating agent for Khalid Al-Rashidi (CB)...</span>
                        </div>
                      )}
                      {/* More log entries would appear here as agents are created */}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                      <span className="text-gray-400">Processing neural network configurations</span>
                    </div>
                    <div className="text-gray-400">
                      Estimated time remaining: {Math.ceil((players.length + oppositionPlayers.length - agentsCreated) * 0.15)}s
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-2">
                        <Users size={16} className="text-blue-400" />
                      </div>
                      <div>
                        <span className="block font-bold">Home Team</span>
                        <span className="text-gray-400">Creating {players.length} agents</span>
                      </div>
                    </div>
                    <div className="text-blue-400 font-bold">
                      {Math.min(agentsCreated, players.length)}/{players.length}
                    </div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center mr-2">
                        <Users size={16} className="text-red-400" />
                      </div>
                      <div>
                        <span className="block font-bold">Away Team</span>
                        <span className="text-gray-400">Creating {oppositionPlayers.length} agents</span>
                      </div>
                    </div>
                    <div className="text-red-400 font-bold">
                      {Math.max(0, agentsCreated - players.length)}/{oppositionPlayers.length}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-bold text-white mb-3">Agent Initialization</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    AURA will create intelligent AI agents for each player using reinforcement learning models. 
                    These agents will simulate player movement, decision-making, and interactions based on their attributes.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded-lg flex items-center">
                      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                        <Brain size={20} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">Neural Networks</h4>
                        <p className="text-xs text-gray-400">
                          Multi-layer perceptrons to model player decision processes
                        </p>
                      </div>
                      <div className="text-green-400">
                        <CheckCircle size={16} />
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg flex items-center">
                      <div className="w-10 h-10 bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <Layers size={20} className="text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">Tactical Layer</h4>
                        <p className="text-xs text-gray-400">
                          Coordination layer for team-wide tactical behaviors
                        </p>
                      </div>
                      <div className="text-green-400">
                        <CheckCircle size={16} />
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg flex items-center">
                      <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center mr-3">
                        <Activity size={20} className="text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">Reinforcement Learning</h4>
                        <p className="text-xs text-gray-400">
                          Models trained to optimize performance through simulated matches
                        </p>
                      </div>
                      <div className="text-green-400">
                        <CheckCircle size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <button 
                      className="py-2 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-full flex items-center transition-colors duration-200"
                      onClick={createAgents}
                    >
                      <Brain size={16} className="mr-2" />
                      Create AI Agents
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h3 className="font-bold text-white mb-2 flex items-center">
                      <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center mr-2">
                        <Users size={12} className="text-blue-400" />
                      </div>
                      Team Agent Structure
                    </h3>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Player Agents:</span>
                        <span className="text-blue-400">{players.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Neural Network Layers:</span>
                        <span className="text-blue-400">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Decision Variables:</span>
                        <span className="text-blue-400">128</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Action Space:</span>
                        <span className="text-blue-400">84</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Observation Space:</span>
                        <span className="text-blue-400">160</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h3 className="font-bold text-white mb-2 flex items-center">
                      <div className="w-5 h-5 bg-red-900 rounded-full flex items-center justify-center mr-2">
                        <Users size={12} className="text-red-400" />
                      </div>
                      Opponent Agent Structure
                    </h3>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex justify-between">
                        <span>Player Agents:</span>
                        <span className="text-red-400">{oppositionPlayers.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Neural Network Layers:</span>
                        <span className="text-red-400">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Decision Variables:</span>
                        <span className="text-red-400">128</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Action Space:</span>
                        <span className="text-red-400">84</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Observation Space:</span>
                        <span className="text-red-400">160</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button 
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center transition-colors duration-200"
            onClick={() => setCurrentPage('opponent-setup')}
            disabled={processingAgents}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back
          </button>
          {processingAgents ? (
            <button 
              className="py-2 px-6 bg-gray-600 text-gray-400 font-bold rounded flex items-center cursor-not-allowed"
              disabled
            >
              <RefreshCw className="mr-2 animate-spin" size={16} />
              Creating Agents...
            </button>
          ) : (
            <button 
              className="py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded flex items-center transition-colors duration-200"
              onClick={() => setCurrentPage('simulation')}
            >
              Continue
              <ArrowRight className="ml-1" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const SimulationPage = () => (
    <div className="flex-1 bg-gray-900 p-5 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl max-w-6xl mx-auto p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Match Simulation</h1>
            <p className="text-gray-400">Run a realistic match simulation with AI-powered players and tactical analysis</p>
          </div>
        </div>

        {/* Simulation Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
              <Settings className="mr-2" size={20} />
              Simulation Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Simulation Speed</label>
                <select 
                  value={simulationSpeed}
                  onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={simulationRunning}
                >
                  <option value="0.5">0.5x - Slow motion</option>
                  <option value="1">1x - Real time</option>
                  <option value="2">2x - Faster</option>
                  <option value="4">4x - Very fast</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-1">Weather Condition</label>
                <select 
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={simulationRunning}
                >
                  <option value="clear">Clear - Perfect visibility</option>
                  <option value="cloudy">Cloudy - Normal conditions</option>
                  <option value="rainy">Rainy - Wet pitch, affects ball movement</option>
                  <option value="windy">Windy - Affects long passes and shots</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-1">Pitch Condition</label>
                <select 
                  value={pitchCondition}
                  onChange={(e) => setPitchCondition(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={simulationRunning}
                >
                  <option value="perfect">Perfect - Ideal playing surface</option>
                  <option value="good">Good - Standard condition</option>
                  <option value="wet">Wet - Slippery surface</option>
                  <option value="poor">Poor - Uneven and slow</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 block mb-1">Crowd Morale</label>
                <select 
                  value={crowdMorale}
                  onChange={(e) => setCrowdMorale(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={simulationRunning}
                >
                  <option value="hostile">Hostile - Heavy pressure on away team</option>
                  <option value="neutral">Neutral - Balanced crowd</option>
                  <option value="enthusiastic">Enthusiastic - Positive atmosphere</option>
                  <option value="electric">Electric - Intense support</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <label className="text-sm text-gray-400">Home Advantage</label>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="homeAdvantage" 
                    name="homeAdvantage" 
                    checked={homeAdvantage}
                    onChange={() => setHomeAdvantage(!homeAdvantage)}
                    className="checkbox sr-only"
                    disabled={simulationRunning}
                  />
                  <label 
                    htmlFor="homeAdvantage" 
                    className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer ${homeAdvantage ? 'bg-blue-600' : 'bg-gray-700'}`}
                  ></label>
                </div>
              </div>
            </div>
          </div>

          {/* Team Information */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
              <Users className="mr-2" size={20} />
              Teams
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {teamName}
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-400">Formation: </span>
                    <span className="text-white">{formationChoice}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Style: </span>
                    <span className="text-white capitalize">{playingStyle}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-400">Players: </span>
                    <span className="text-white">{players.length} (+{substitutes.length})</span>
                  </div>
                  <div className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded-full text-xs">
                    Home
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  {opponentName}
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-400">Formation: </span>
                    <span className="text-white">{opponentFormation}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Style: </span>
                    <span className="text-white capitalize">{opponentStyle}</span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-400">Players: </span>
                    <span className="text-white">{oppositionPlayers.length}</span>
                  </div>
                  <div className="bg-red-900 text-red-200 px-2 py-0.5 rounded-full text-xs">
                    Away
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  AI Agent Status
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-400">Total Agents: </span>
                    <span className="text-white">{players.length + oppositionPlayers.length}</span>
                  </div>
                  <div className="bg-purple-900 text-purple-200 px-2 py-0.5 rounded-full text-xs">
                    Ready
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm">
                  <div>
                    <span className="text-gray-400">Model Type: </span>
                    <span className="text-white">Advanced RL</span>
                  </div>
                  <div className="text-green-400 text-xs flex items-center">
                    <CheckCircle size={12} className="mr-1" />
                    Activated
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation Control */}
          <div className="bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
              <Activity className="mr-2" size={20} />
              Simulation Control
            </h2>
            
            {simulationRunning ? (
              <div className="space-y-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-yellow-400" />
                      <span className="font-bold">{Math.floor(simulationTime)}:00</span>
                    </div>
                    <div className="bg-gray-900 px-3 py-1 rounded-full text-sm flex items-center">
                      <div className="animate-pulse flex">
                        <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                        <div className="h-2 w-2 bg-green-400 rounded-full mr-1"></div>
                        <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                      </div>
                      <span className="ml-2">Simulating</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <div className="bg-gray-900 px-3 py-1 rounded-full flex items-center shadow-inner">
                      <span className="font-bold text-blue-400">{teamName} {score.home}</span>
                      <span className="mx-2">-</span>
                      <span className="font-bold text-red-400">{score.away} {opponentName}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-400">Poss: </span>
                      <span className="text-blue-400 font-bold">{possession.home}%</span>
                      <span className="mx-1">-</span>
                      <span className="text-red-400 font-bold">{possession.away}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-3 mb-1 shadow-inner overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-green-500 h-3 rounded-full transition-all duration-300 ease-out flex items-center justify-end"
                      style={{ width: `${simulationProgress}%` }}
                    >
                      {simulationProgress > 10 && (
                        <span className="text-xs px-2 font-bold">{simulationProgress}%</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between w-full text-xs text-gray-400">
                    <span>0'</span>
                    <span>15'</span>
                    <span>30'</span>
                    <span>45'</span>
                    <span>60'</span>
                    <span>75'</span>
                    <span>90'</span>
                  </div>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-300 mb-2">Latest Events</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {matchEvents.slice(0, 3).map((event, idx) => (
                      <div key={idx} className="bg-gray-800 p-2 rounded-lg text-sm flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md mr-2 ${
                          event.goal ? 'bg-gradient-to-r from-green-600 to-green-500' : 
                          event.alert ? 'bg-gradient-to-r from-red-600 to-red-500' : 
                          event.homeAction ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-gray-600 to-gray-500'
                        }`}>
                          {event.time}'
                        </div>
                        <span className="text-sm">{event.event}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded flex items-center justify-center transition-colors duration-200 shadow-inner disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled
                >
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Simulation in Progress...
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-300 mb-2">Win Probability</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-bold">{teamName}</span>
                    <span className="text-green-400 font-bold">62%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 mb-3 shadow-inner overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-green-500 h-3 rounded-full" style={{width: '62%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-400 font-bold">{opponentName}</span>
                    <span className="text-yellow-400 font-bold">38%</span>
                  </div>
                </div>

                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-gray-300 mb-2">Pre-Match Analysis</h3>
                  <p className="text-sm text-gray-300">
                    AI analysis suggests a competitive match with {teamName}'s strong midfield control likely to be decisive against {opponentName}'s counter-attacking approach.
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <div className="bg-blue-900 bg-opacity-40 px-2 py-1 rounded text-xs">
                      <span className="text-blue-300">Key Player: </span>
                      <span className="text-white">Al-Dawsari</span>
                    </div>
                    <div className="bg-red-900 bg-opacity-40 px-2 py-1 rounded text-xs">
                      <span className="text-red-300">Threat: </span>
                      <span className="text-white">Al-Buraikan</span>
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-full flex items-center justify-center transition-all duration-300 shadow-lg transform hover:scale-105"
                  onClick={startSimulation}
                >
                  <Play size={16} className="mr-2" />
                  Start Match Simulation
                </button>
              </div>
            )}
            
            {simulationComplete && (
              <div className="mt-4">
                <button 
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg"
                  onClick={() => setCurrentPage('report')}
                >
                  <FileText size={16} className="mr-2" />
                  View Full Match Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Virtual Field Display */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
            <Eye className="mr-2" size={20} />
            Match Visualization
          </h2>
          
          <div className="relative bg-green-800 h-96 w-full rounded-lg overflow-hidden border border-gray-600 shadow-inner">
            {/* Field Markings */}
            <div className="absolute inset-0">
              {/* Center Circle */}
              <div className="absolute rounded-full border-2 border-white opacity-60"
                   style={{width: '14%', height: '14%', left: '43%', top: '43%'}}></div>
              
              {/* Center Line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white opacity-60"></div>
              
              {/* Penalty Areas */}
              <div className="absolute bottom-0 left-1/3 right-1/3 h-1/6 border-2 border-white opacity-60"></div>
              <div className="absolute top-0 left-1/3 right-1/3 h-1/6 border-2 border-white opacity-60"></div>
              
              {/* Goal Areas */}
              <div className="absolute bottom-0 left-2/5 right-2/5 h-1/15 border-2 border-white opacity-60"></div>
              <div className="absolute top-0 left-2/5 right-2/5 h-1/15 border-2 border-white opacity-60"></div>

              {/* Penalty Spots */}
              <div className="absolute bottom-1/10 left-1/2 w-1 h-1 bg-white opacity-80 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute top-1/10 left-1/2 w-1 h-1 bg-white opacity-80 rounded-full transform -translate-x-1/2"></div>

              {/* Corner Arc indicators */}
              <div className="absolute top-0 left-0 w-4 h-4 border-r-2 border-white opacity-60 rounded-br-full"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-white opacity-60 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-white opacity-60 rounded-tr-full"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-l-2 border-white opacity-60 rounded-tl-full"></div>
              
              {/* Field texture/lines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                {[...Array(11)].map((_, i) => (
                  <div key={`vl-${i}`} className="absolute top-0 bottom-0 w-px bg-green-700" style={{left: `${i * 10}%`}}></div>
                ))}
                {[...Array(11)].map((_, i) => (
                  <div key={`hl-${i}`} className="absolute left-0 right-0 h-px bg-green-700" style={{top: `${i * 10}%`}}></div>
                ))}
              </div>
            </div>

            {/* Display players conditionally when simulation is running */}
            {simulationRunning && (
              <>
                {/* Home Team Players */}
                {players.map(player => (
                  <div 
                    key={player.id}
                    className="absolute w-10 h-10 flex flex-col items-center justify-center transition-all duration-500"
                    style={{
                      left: `${player.x}%`, 
                      top: `${player.y}%`, 
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Player Avatar */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 border-2 border-white overflow-hidden shadow-md">
                      <img 
                        src={player.imgUrl} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <span className="text-white font-bold text-xs">{player.number}</span>
                      </div>
                    </div>
                    
                    {/* Player position label */}
                    <div className="text-center mt-1 bg-black bg-opacity-70 px-1.5 py-0.5 rounded-full">
                      <p className="text-xs font-bold tracking-tight">{player.position}</p>
                    </div>
                    
                    {/* Player fatigue indicator */}
                    {player.fatigue > 60 && (
                      <div className="absolute -top-2 -right-2 flex items-center justify-center">
                        <div className={`h-3 w-3 rounded-full ${
                          player.fatigue > 75 ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Opposition Players */}
                {oppositionPlayers.map(player => (
                  <div 
                    key={player.id}
                    className="absolute w-10 h-10 flex flex-col items-center justify-center transition-all duration-500"
                    style={{
                      left: `${player.x}%`, 
                      top: `${player.y}%`, 
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Player Avatar */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500 border-2 border-white overflow-hidden shadow-md">
                      <img 
                        src={player.imgUrl} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                        <span className="text-white font-bold text-xs">{player.number}</span>
                      </div>
                    </div>
                    
                    {/* Player position label */}
                    <div className="text-center mt-1 bg-black bg-opacity-70 px-1.5 py-0.5 rounded-full">
                      <p className="text-xs font-bold tracking-tight">{player.position}</p>
                    </div>
                  </div>
                ))}
                
                {/* Ball */}
                <div 
                  className="absolute w-5 h-5 rounded-full shadow-lg z-40 transition-transform duration-300"
                  style={{
                    left: `50%`,
                    top: `50%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle at 35% 35%, white 0%, #f0f0f0 25%, #ddd 50%, #ccc 75%, #bbb 100%)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.7), inset 2px 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  {/* Ball shadow */}
                  <div 
                    className="absolute w-4 h-1 bg-black rounded-full opacity-30"
                    style={{
                      bottom: '-4px',
                      left: '0.5px',
                    }}
                  ></div>
                  
                  {/* Ball pattern */}
                  <div className="absolute inset-0 rounded-full overflow-hidden opacity-60">
                    <div className="absolute w-full h-0.5 bg-black top-1/3 left-0"></div>
                    <div className="absolute w-full h-0.5 bg-black top-2/3 left-0"></div>
                    <div className="absolute h-full w-0.5 bg-black left-1/3 top-0"></div>
                    <div className="absolute h-full w-0.5 bg-black left-2/3 top-0"></div>
                  </div>
                </div>
              </>
            )}
            
            {!simulationRunning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-70 p-4 rounded-lg text-center">
                  <Play size={40} className="mx-auto mb-2 text-green-400" />
                  <p className="text-white font-bold">Click "Start Match Simulation" to begin</p>
                  <p className="text-gray-400 text-sm mt-1">Watch AI-powered players execute your tactics in real-time</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Match Events Log */}
        {simulationRunning && (
          <div className="mt-6 bg-gray-800 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center">
              <Activity className="mr-2" size={20} />
              Match Events
            </h2>
            
            <div className="overflow-auto max-h-60 custom-scrollbar pr-1">
              {matchEvents.length > 0 ? (
                <div className="space-y-2">
                  {matchEvents.map((event, index) => (
                    <div key={index} className="relative pl-8 pb-4">
                      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-transparent"></div>
                      <div className={`absolute left-1 top-0 w-5 h-5 rounded-full flex items-center justify-center text-xs shadow-md ${
                        event.goal ? 'bg-gradient-to-r from-green-600 to-green-500' : 
                        event.alert ? 'bg-gradient-to-r from-red-600 to-red-500' : 
                        event.homeAction ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-gray-600 to-gray-500'
                      }`}>
                        {event.goal ? '⚽' : event.substitution ? '↻' : '•'}
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold bg-gray-900 px-2 py-0.5 rounded-full">{event.time}'</span>
                          {event.goal && <span className="text-xs bg-green-800 px-2 py-0.5 rounded-full">GOAL</span>}
                          {event.substitution && <span className="text-xs bg-blue-800 px-2 py-0.5 rounded-full">SUBSTITUTION</span>}
                        </div>
                        <p className="text-sm mt-2">{event.event}</p>
                        
                        {/* Preview for goal events */}
                        {event.goal && (
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <img 
                                src={event.homeAction ? players.find(p => p.position === 'ST')?.imgUrl : oppositionPlayers.find(p => p.position === 'ST')?.imgUrl} 
                                alt="Scorer" 
                                className="w-8 h-8 rounded-full object-cover border border-gray-700"
                              />
                              <svg className="w-4 h-4 mx-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                <span className="text-black text-xs">⚽</span>
                              </div>
                            </div>
                            <button className="text-xs bg-gray-900 hover:bg-gray-800 px-2 py-1 rounded transition-colors duration-200">
                              View Replay
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 bg-gray-700 rounded-lg shadow-inner">
                  <RefreshCw size={24} className="mx-auto mb-2 opacity-50" />
                  <p>Waiting for match events...</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button 
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center transition-colors duration-200"
            onClick={() => setCurrentPage('ai-agents')}
            disabled={simulationRunning}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back to Setup
          </button>
          {simulationComplete && (
            <button 
              className="py-2 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded flex items-center transition-colors duration-200"
              onClick={() => setCurrentPage('report')}
            >
              View Full Match Report
              <ArrowRight className="ml-1" size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const ReportPage = () => {
    // *** STEP 1: Add State ***
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    
    // *** STEP 2: Add useEffect to reset state when tab changes ***
    useEffect(() => {
      // Reset video state if the tab changes away from 'video'
      if (reportTab !== 'video') {
        setIsVideoPlaying(false);
      }
    }, [reportTab]); // Dependency array includes reportTab

    // *** STEP 5: Placeholder Video URL ***
    const videoUrl = "/videos/Recording 2025-04-09 215115.mp4"; // Example URL

    return (

    <div className="flex-1 bg-gray-900 p-5 overflow-y-auto">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl max-w-6xl mx-auto p-5 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Match Analysis Report</h1>
            <p className="text-gray-400">Comprehensive tactical analysis and performance insights</p>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg flex items-center space-x-2">
            <div className="text-lg font-semibold flex items-center">
              <span className="text-blue-400">{teamName} {simulationResult.matchResult.homeScore}</span>
              <span className="mx-2 text-gray-400">-</span>
              <span className="text-red-400">{simulationResult.matchResult.awayScore} {opponentName}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mr-3 shadow-md">
                <span className="text-xl font-bold text-white">{simulationResult.matchResult.homeScore}</span>
              </div>
              <div className="text-center mx-2">
                <span className="block font-bold text-lg">-</span>
              </div>
              <div className="w-12 h-12 bg-red-900 rounded-full flex items-center justify-center ml-3 shadow-md">
                <span className="text-xl font-bold text-white">{simulationResult.matchResult.awayScore}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold text-white">{teamName}</div>
              <span className="text-gray-400">vs</span>
              <div className="text-xl font-bold text-white">{opponentName}</div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                className="py-1 px-3 bg-gray-700 hover:bg-gray-600 text-sm flex items-center rounded transition-colors duration-200"
              >
                <Download size={14} className="mr-1" />
                Export Report
              </button>
              <button 
                className="py-1 px-3 bg-blue-700 hover:bg-blue-600 text-sm flex items-center rounded transition-colors duration-200"
              >
                <Video size={14} className="mr-1" />
                Watch Replay
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-bold text-gray-300 mb-2">POSSESSION</h3>
              <div className="flex items-center">
                <div className="text-lg font-bold text-blue-400">{simulationResult.matchResult.possession.home}%</div>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full" 
                      style={{width: `${simulationResult.matchResult.possession.home}%`}}
                    ></div>
                  </div>
                </div>
                <div className="text-lg font-bold text-red-400">{simulationResult.matchResult.possession.away}%</div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-bold text-gray-300 mb-2">SHOTS</h3>
              <div className="flex items-center">
                <div className="text-lg font-bold text-blue-400">{simulationResult.keyStats.shots.home}</div>
                <div className="flex-1 mx-3 text-center">
                  <span className="text-xs text-gray-400">({simulationResult.keyStats.shotsOnTarget.home} on target)</span>
                </div>
                <div className="text-lg font-bold text-red-400">{simulationResult.keyStats.shots.away}</div>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden mt-2">
                <div 
                  className="bg-blue-600 h-full rounded-full" 
                  style={{width: `${(simulationResult.keyStats.shots.home / (simulationResult.keyStats.shots.home + simulationResult.keyStats.shots.away)) * 100}%`}}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-bold text-gray-300 mb-2">PASS ACCURACY</h3>
              <div className="flex items-center">
                <div className="text-lg font-bold text-blue-400">{simulationResult.keyStats.passAccuracy.home}%</div>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full" 
                      style={{width: `${simulationResult.keyStats.passAccuracy.home}%`}}
                    ></div>
                  </div>
                </div>
                <div className="text-lg font-bold text-red-400">{simulationResult.keyStats.passAccuracy.away}%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg col-span-1">
              <h3 className="text-sm font-bold text-gray-300 mb-2">ADDITIONAL STATS</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-400 font-bold">{simulationResult.keyStats.corners.home}</span>
                  <span className="text-gray-400">Corners</span>
                  <span className="text-red-400 font-bold">{simulationResult.keyStats.corners.away}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-400 font-bold">{simulationResult.keyStats.fouls.home}</span>
                  <span className="text-gray-400">Fouls</span>
                  <span className="text-red-400 font-bold">{simulationResult.keyStats.fouls.away}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-400 font-bold">{simulationResult.keyStats.offsides.home}</span>
                  <span className="text-gray-400">Offsides</span>
                  <span className="text-red-400 font-bold">{simulationResult.keyStats.offsides.away}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-400 font-bold">{simulationResult.keyStats.yellowCards.home}</span>
                  <span className="text-gray-400">Yellow Cards</span>
                  <span className="text-red-400 font-bold">{simulationResult.keyStats.yellowCards.away}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-3 rounded-lg col-span-2">
              <h3 className="text-sm font-bold text-gray-300 mb-2">KEY CHANCES</h3>
              <div className="space-y-1 max-h-28 overflow-y-auto custom-scrollbar pr-1">
                {simulationResult.keyChances.map((chance, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <div className="w-8 text-center text-xs text-gray-400">{chance.minute}'</div>
                    <div className={`ml-2 w-3 h-3 rounded-full ${chance.team === 'home' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                    <div className="ml-2 flex-1">{chance.player}</div>
                    <div className="mr-2">
                      {chance.outcome === 'Scored' ? (
                        <span className="text-green-400">Goal</span>
                      ) : chance.outcome === 'Saved' ? (
                        <span className="text-yellow-400">Saved</span>
                      ) : (
                        <span className="text-red-400">Missed</span>
                      )}
                    </div>
                    <div className="w-12 text-right">
                      <span className="text-xs px-1 py-0.5 bg-gray-800 rounded">xG: {chance.xG}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Report Tabs */}
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar-x">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                reportTab === 'summary' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setReportTab('summary')}
            >
              <Eye size={16} className="mr-2" />
              Summary
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                reportTab === 'tactics' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setReportTab('tactics')}
            >
              <Layers size={16} className="mr-2" />
              Tactical Analysis
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                reportTab === 'players' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setReportTab('players')}
            >
              <Users size={16} className="mr-2" />
              Player Analysis
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                reportTab === 'weaknesses' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setReportTab('weaknesses')}
            >
              <AlertTriangle size={16} className="mr-2" />
              Weaknesses
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                reportTab === 'strengths' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setReportTab('strengths')}
            >
              <Award size={16} className="mr-2" />
              Strengths
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                reportTab === 'recommendations' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setReportTab('recommendations')}
            >
              <Book size={16} className="mr-2" />
              Recommendations
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                reportTab === 'video' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => setReportTab('video')}
            >
              <Video size={16} className="mr-2" />
              Simulation Video
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {reportTab === 'summary' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Match Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Key Insights</h3>
                  <ul className="space-y-2">
                    {simulationResult.tacticalInsights.map((insight, idx) => (
                      <li key={idx} className="flex text-sm">
                        <div className="w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          <span className="text-xs text-white">{idx+1}</span>
                        </div>
                        <span className="text-gray-300">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Match Flow</h3>
                  <div className="relative h-16 w-full bg-gray-800 rounded-lg overflow-hidden mb-2">
                    {/* Timeline visualization */}
                    <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                      <div className="w-full h-1 bg-gray-600"></div>
                    </div>
                    
                    {/* Goal markers */}
                    <div className="absolute inset-0">
                      {simulationResult.keyChances.filter(c => c.outcome === 'Scored').map((goal, idx) => (
                        <div 
                          key={idx}
                          className={`absolute top-1/2 w-3 h-3 -mt-1.5 ${goal.team === 'home' ? 'bg-blue-500' : 'bg-red-500'} rounded-full transform -translate-x-1/2 opacity-70`}
                          style={{ left: `${(goal.minute / 90) * 100}%` }}
                        >
                          <div className={`absolute -top-8 -left-5 bg-${goal.team === 'home' ? 'blue' : 'red'}-900 rounded px-2 py-0.5 text-xs text-white whitespace-nowrap`}>
                            {goal.minute}' {goal.player}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Time markers */}
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-400 px-2">
                      <span>0'</span>
                      <span>15'</span>
                      <span>30'</span>
                      <span>45'</span>
                      <span>60'</span>
                      <span>75'</span>
                      <span>90'</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                      <span className="text-gray-300">{teamName} Goal</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-gray-300">{opponentName} Goal</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">MOTM & Key Players</h3>
                  <div className="flex items-center p-2 bg-gray-800 rounded-lg mb-3">
                    <div className="relative mr-3">
                      <img 
                        src={players.find(p => p.name === "Salem Al-Dawsari").imgUrl} 
                        alt="Al-Dawsari" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-yellow-500"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Award size={16} className="text-gray-900" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Salem Al-Dawsari</div>
                      <div className="text-xs text-gray-400">1 assist, 5 chances created, 92% pass accuracy</div>
                      <div className="flex items-center mt-1">
                        <div className="text-yellow-400 text-xs font-bold">MOTM</div>
                        <div className="ml-2 bg-gray-700 rounded-full py-0.5 px-2 text-xs">
                          Rating: 8.7
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {players.filter(p => p.name !== "Salem Al-Dawsari" && p.analysisReport.performance > 8.0).slice(0, 4).map((player, idx) => (
                      <div key={idx} className="flex items-center p-2 bg-gray-800 rounded-lg">
                        <img 
                          src={player.imgUrl} 
                          alt={player.name} 
                          className="w-8 h-8 rounded-full object-cover mr-2 border border-blue-500"
                        />
                        <div>
                          <div className="font-bold text-sm">{player.name}</div>
                          <div className="text-xs text-gray-400">{player.position}</div>
                          <div className="bg-gray-700 rounded-full py-0.5 px-2 text-xs mt-1">
                            Rating: {player.analysisReport.performance}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Performance Comparison</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Attacking Effectiveness</span>
                        <div className="flex space-x-2">
                          <span className="text-blue-400">7.8</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-red-400">6.5</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Defensive Stability</span>
                        <div className="flex space-x-2">
                          <span className="text-blue-400">6.9</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-red-400">7.2</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{width: '69%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Tactical Discipline</span>
                        <div className="flex space-x-2">
                          <span className="text-blue-400">8.1</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-red-400">7.4</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{width: '81%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Team Cohesion</span>
                        <div className="flex space-x-2">
                          <span className="text-blue-400">7.6</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-red-400">6.8</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{width: '76%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-400">Physical Condition</span>
                        <div className="flex space-x-2">
                          <span className="text-blue-400">7.2</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-red-400">7.5</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{width: '72%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'tactics' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Tactical Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Formation Effectiveness</h3>
                  <div className="relative h-64 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-3">
                    {/* Field markings */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                    <div className="absolute rounded-full border border-white opacity-20"
                         style={{width: '14%', height: '14%', left: '43%', top: '43%'}}></div>
                    <div className="absolute bottom-0 left-1/3 right-1/3 h-1/6 border border-white opacity-20"></div>
                    <div className="absolute top-0 left-1/3 right-1/3 h-1/6 border border-white opacity-20"></div>
                    
                    {/* Display players on the field */}
                    {formationChoice === '4-2-3-1' && players.slice(0, 11).map(player => (
                      <div key={player.id} className="absolute group">
                        <div 
                          className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform duration-200"
                          style={{left: `${player.baseX}%`, top: `${player.baseY}%`}}
                        >
                          <span className="text-white text-xs font-bold">{player.number}</span>
                          
                          {/* Heatmap overlay for player movement */}
                          <div className="absolute -inset-6 bg-blue-500 rounded-full opacity-20 blur-sm"></div>
                          
                          {/* Player details popup */}
                          <div className="absolute left-1/2 -top-24 transform -translate-x-1/2 w-48 bg-gray-800 rounded p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                            <div className="flex items-center mb-1">
                              <img 
                                src={player.imgUrl} 
                                alt={player.name} 
                                className="w-8 h-8 rounded-full object-cover mr-2 border border-blue-500"
                              />
                              <div>
                                <div className="font-bold text-sm">{player.name}</div>
                                <div className="text-xs text-gray-400">{player.position}</div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-300">
                              {player.analysisReport.summary}
                            </div>
                            <div className="mt-1 flex justify-between text-xs">
                              <span className="text-gray-400">Rating</span>
                              <span className={`font-bold ${
                                player.analysisReport.performance > 8 ? 'text-green-400' : 
                                player.analysisReport.performance > 7 ? 'text-blue-400' : 
                                player.analysisReport.performance > 6 ? 'text-yellow-400' : 
                                'text-red-400'
                              }`}>
                                {player.analysisReport.performance}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute w-16 text-center -bottom-6 left-1/2 transform -translate-x-1/2"
                             style={{left: `${player.baseX}%`, top: `${player.baseY}%`}}
                        >
                          <span className="text-white text-xs bg-blue-800 px-1 rounded">{player.position}</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Heatmap overlays for team movement */}
                    <div className="absolute left-5 top-1/4 w-1/4 h-1/2 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute right-5 top-1/4 w-1/4 h-1/2 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute left-1/3 top-1/5 w-1/3 h-1/3 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
                    
                    {/* Attacking/Defensive arrows */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                      </defs>
                      
                      {/* Right wing attack */}
                      <path 
                        d="M75,70 C80,60 85,50 90,30" 
                        stroke="#3b82f6" 
                        strokeWidth="2" 
                        strokeDasharray="4 2" 
                        fill="none" 
                        markerEnd="url(#arrowhead)"
                        opacity="0.7"
                      />
                      
                      {/* Left wing attack */}
                      <path 
                        d="M25,70 C20,60 15,50 10,30" 
                        stroke="#3b82f6" 
                        strokeWidth="2" 
                        strokeDasharray="4 2" 
                        fill="none" 
                        markerEnd="url(#arrowhead)"
                        opacity="0.7"
                      />
                      
                      {/* Central attack */}
                      <path 
                        d="M50,60 C50,50 50,40 50,25" 
                        stroke="#3b82f6" 
                        strokeWidth="2" 
                        fill="none" 
                        markerEnd="url(#arrowhead)"
                        opacity="0.9"
                      />
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="text-xs font-bold text-gray-300 mb-2">ATTACKING PATTERNS</h4>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle size={12} className="mr-1 text-green-400" />
                          Strong build-up play through central midfielders
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={12} className="mr-1 text-green-400" />
                          Effective use of width with overlapping full-backs
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={12} className="mr-1 text-green-400" />
                          Quick transitions creating numerical advantages
                        </li>
                        <li className="flex items-center">
                          <AlertTriangle size={12} className="mr-1 text-red-400" />
                          Striker occasionally isolated during long possession phases
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="text-xs font-bold text-gray-300 mb-2">DEFENSIVE ORGANIZATION</h4>
                      <ul className="space-y-1 text-xs text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle size={12} className="mr-1 text-green-400" />
                          Compact central defensive block limiting penetration
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={12} className="mr-1 text-green-400" />
                          Strong defensive midfield shielding back four
                        </li>
                        <li className="flex items-center">
                          <AlertTriangle size={12} className="mr-1 text-red-400" />
                          Right flank vulnerable during counter-attacks
                        </li>
                        <li className="flex items-center">
                          <AlertTriangle size={12} className="mr-1 text-red-400" />
                          Gaps appearing between lines when both CDMs press
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Tactical Effectiveness By Phase</h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Build-up Play</span>
                        <span className="text-green-400 font-bold">8.5</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-green-500 h-full rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Excellent progression through the thirds</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Attacking Transitions</span>
                        <span className="text-green-400 font-bold">8.2</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-green-500 h-full rounded-full" style={{width: '82%'}}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Quick counter-attacks creating chances</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Defensive Transitions</span>
                        <span className="text-yellow-400 font-bold">6.8</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-yellow-500 h-full rounded-full" style={{width: '68%'}}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Vulnerabilities when losing possession</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Defensive Organization</span>
                        <span className="text-blue-400 font-bold">7.6</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-blue-500 h-full rounded-full" style={{width: '76%'}}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Solid defensive shape with minor gaps</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="text-xs font-bold text-gray-300 mb-2">Formation Comparison</h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>4-2-3-1 (Current)</span>
                          <span className="text-blue-400 font-bold">8.2</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div className="bg-blue-500 h-full rounded-full" style={{width: '82%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>4-3-3 (Alternative)</span>
                          <span className="text-green-400 font-bold">8.5</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div className="bg-green-500 h-full rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <p className="text-gray-400 mt-1 italic">Recommendation: Switch to 4-3-3 against opponents with fast wingers</p>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>3-5-2 (Alternative)</span>
                          <span className="text-yellow-400 font-bold">7.8</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div className="bg-yellow-500 h-full rounded-full" style={{width: '78%'}}></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Passing Network</h3>
                  <div className="relative h-72 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-2">
                    {/* Field markings */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                    <div className="absolute rounded-full border border-white opacity-30"
                         style={{width: '14%', height: '14%', left: '43%', top: '43%'}}></div>
                    
                    {/* Passing network visualization */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      {/* Connection lines based on pass frequency */}
                      <line x1="50" y1="85" x2="35" y2="70" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
                      <line x1="50" y1="85" x2="65" y2="70" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
                      <line x1="35" y1="70" x2="15" y2="70" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                      <line x1="65" y1="70" x2="85" y2="70" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
                      <line x1="35" y1="70" x2="35" y2="50" stroke="#3b82f6" strokeWidth="3" opacity="0.7" />
                      <line x1="65" y1="70" x2="65" y2="50" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                      <line x1="15" y1="70" x2="35" y2="50" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
                      <line x1="85" y1="70" x2="65" y2="50" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
                      <line x1="35" y1="50" x2="65" y2="50" stroke="#3b82f6" strokeWidth="4" opacity="0.8" />
                      <line x1="35" y1="50" x2="50" y2="40" stroke="#3b82f6" strokeWidth="3" opacity="0.7" />
                      <line x1="65" y1="50" x2="50" y2="40" stroke="#3b82f6" strokeWidth="3" opacity="0.7" />
                      <line x1="50" y1="40" x2="20" y2="30" stroke="#3b82f6" strokeWidth="3" opacity="0.7" />
                      <line x1="50" y1="40" x2="80" y2="30" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                      <line x1="50" y1="40" x2="50" y2="15" stroke="#3b82f6" strokeWidth="3" opacity="0.7" />
                      <line x1="20" y1="30" x2="50" y2="15" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                      <line x1="80" y1="30" x2="50" y2="15" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
                      
                      {/* Player nodes */}
                      {players.slice(0, 11).map(player => (
                        <circle 
                          key={player.id}
                          cx={player.baseX} 
                          cy={player.baseY} 
                          r={3 + (player.stats.passing / 20)} 
                          fill="#3b82f6" 
                          opacity="0.8"
                        />
                      ))}
                    </svg>
                    
                    {/* Strongest connection highlight */}
                    <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-70 rounded px-2 py-1">
                      <span className="text-xs text-white">Strongest connection: CDMs</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-300">
                    <p>The passing network shows high connectivity between central defensive midfielders, creating a strong foundation for build-up play. The CAM (Al-Dawsari) acts as the primary connector between midfield and attack.</p>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Most frequent passer:</span>
                      <span className="font-bold">Mohammed Al-Sahlawi (CDM)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Most passes received:</span>
                      <span className="font-bold">Salem Al-Dawsari (CAM)</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Key pass route:</span>
                      <span className="font-bold">CAM → LW (5 chances)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Tactical Adjustments</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-blue-400">High Press Effectiveness</h4>
                        <div className="bg-green-900 rounded-full px-2 py-0.5 text-xs text-green-400">
                          +35% ball recovery
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        The high press was most effective between minutes 60-75, forcing 8 turnovers in dangerous areas.
                      </p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-blue-400">Width Adjustment</h4>
                        <div className="bg-blue-900 rounded-full px-2 py-0.5 text-xs text-blue-400">
                          +42% attacking chances
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        Increased width in attack after minute 35 created more crossing opportunities and stretched opponent defense.
                      </p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-blue-400">CDM Positioning</h4>
                        <div className="bg-yellow-900 rounded-full px-2 py-0.5 text-xs text-yellow-400">
                          Mixed impact
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mt-1">
                        Staggering CDMs improved build-up play but occasionally left gaps that opponents exploited on counter-attacks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'players' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Player Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2 flex justify-between items-center">
                    <span>Player Ratings</span>
                    <div className="text-xs bg-blue-900 px-2 py-1 rounded">
                      Team Average: 7.6
                    </div>
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                    {players.slice(0, 11).sort((a, b) => b.analysisReport.performance - a.analysisReport.performance).map((player, idx) => (
                      <div key={idx} className="bg-gray-800 p-2 rounded-lg flex items-center">
                        <div className="relative mr-2">
                          <img 
                            src={player.imgUrl} 
                            alt={player.name} 
                            className="w-10 h-10 rounded-full object-cover border border-gray-600"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border border-gray-800 ${
                            player.analysisReport.performance >= 8 ? 'bg-green-600' : 
                            player.analysisReport.performance >= 7 ? 'bg-blue-600' : 
                            player.analysisReport.performance >= 6 ? 'bg-yellow-600' : 
                            'bg-red-600'
                          }`}>
                            {player.analysisReport.performance}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium truncate" style={{maxWidth: '120px'}}>{player.name}</div>
                          <div className="flex items-center">
                            <span className="text-xs bg-gray-700 px-1 rounded mr-1">{player.position}</span>
                            <span className="text-xs text-gray-400">#{player.number}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center text-xs text-gray-400 space-x-5">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-1"></div>
                      <span>Excellent (8+)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                      <span>Good (7-7.9)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-600 rounded-full mr-1"></div>
                      <span>Average (6-6.9)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-1"></div>
                      <span>Poor (6-)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-3">Individual Player Reports</h3>
                  
                  <div className="space-y-4">
                    {/* Top performer detailed report */}
                    <div className="bg-gray-800 p-3 rounded-lg border-l-4 border-green-500">
                      <div className="flex">
                        <div className="mr-3">
                          <img 
                            src={players.find(p => p.name === "Salem Al-Dawsari").imgUrl} 
                            alt="Al-Dawsari" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white">Salem Al-Dawsari</h4>
                              <div className="flex items-center">
                                <span className="text-xs bg-blue-900 px-1 rounded mr-2">CAM</span>
                                <span className="text-xs text-gray-400">#10</span>
                              </div>
                            </div>
                            <div className="bg-green-900 px-2 py-1 rounded text-green-400 font-bold">
                              8.7
                            </div>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Passes:</span>
                              <span>67 (92% accuracy)</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Chances created:</span>
                              <span>5</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Assists:</span>
                              <span>1</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Distance covered:</span>
                              <span>11.2 km</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Duels won:</span>
                              <span>7/12 (58%)</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Key passes:</span>
                              <span>8</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-sm text-gray-300">
                            <p>Al-Dawsari was the creative hub of the team, consistently finding space between the opposition's midfield and defensive lines. His vision and passing range created multiple high-quality chances.</p>
                          </div>
                          
                          <div className="mt-2">
                            <h5 className="text-xs font-bold text-gray-400 mb-1">STRENGTHS</h5>
                            <div className="flex flex-wrap gap-1">
                              {players.find(p => p.name === "Salem Al-Dawsari").analysisReport.strengths.map((strength, idx) => (
                                <span key={idx} className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            <h5 className="text-xs font-bold text-gray-400 mb-1">WEAKNESSES</h5>
                            <div className="flex flex-wrap gap-1">
                              {players.find(p => p.name === "Salem Al-Dawsari").analysisReport.weaknesses.map((weakness, idx) => (
                                <span key={idx} className="text-xs bg-gray-700 px-2 py-0.5 rounded">
                                  {weakness}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Problem player report */}
                    <div className="bg-gray-800 p-3 rounded-lg border-l-4 border-red-500">
                      <div className="flex">
                        <div className="mr-3">
                          <img 
                            src={players.find(p => p.name === "Yasser Al-Shahrani").imgUrl} 
                            alt="Al-Shahrani" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white">Yasser Al-Shahrani</h4>
                              <div className="flex items-center">
                                <span className="text-xs bg-blue-900 px-1 rounded mr-2">CDM</span>
                                <span className="text-xs text-gray-400">#8</span>
                              </div>
                            </div>
                            <div className="bg-red-900 px-2 py-1 rounded text-red-400 font-bold">
                              6.4
                            </div>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Passes:</span>
                              <span>43 (78% accuracy)</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Tackles:</span>
                              <span>2/5 successful</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Interceptions:</span>
                              <span>3</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Distance covered:</span>
                              <span>10.4 km</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Duels won:</span>
                              <span>4/11 (36%)</span>
                            </div>
                            <div className="flex justify-between text-xs text-red-400 font-bold">
                              <span>Fatigue level:</span>
                              <span>78%</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-sm text-gray-300">
                            <p>Al-Shahrani showed clear signs of fatigue after the 55-minute mark, significantly reducing his defensive coverage and ability to track opposition runners. His fatigue compromised the team's defensive structure.</p>
                          </div>
                          
                          <div className="mt-2 bg-red-900 bg-opacity-20 p-2 rounded-lg border border-red-900">
                            <h5 className="text-xs font-bold text-red-400 mb-1 flex items-center">
                              <AlertTriangle size={12} className="mr-1" />
                              CRITICAL ISSUE
                            </h5>
                            <p className="text-xs text-gray-300">
                              Player showing signs of accumulated fatigue that significantly impacts performance. Consider rest period and modified training schedule for the next 72 hours.
                            </p>
                            <div className="mt-2 flex space-x-2">
                              <button className="bg-red-900 hover:bg-red-800 text-xs px-2 py-1 rounded text-white">
                                View Recovery Plan
                              </button>
                              <button className="bg-gray-700 hover:bg-gray-600 text-xs px-2 py-1 rounded text-white">
                                Training Modification
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Second strong performer */}
                    <div className="bg-gray-800 p-3 rounded-lg border-l-4 border-blue-500">
                      <div className="flex">
                        <div className="mr-3">
                          <img 
                            src={players.find(p => p.name === "Mohammed Al-Sahlawi").imgUrl} 
                            alt="Al-Sahlawi" 
                            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-white">Mohammed Al-Sahlawi</h4>
                              <div className="flex items-center">
                                <span className="text-xs bg-blue-900 px-1 rounded mr-2">CDM</span>
                                <span className="text-xs text-gray-400">#6</span>
                              </div>
                            </div>
                            <div className="bg-blue-900 px-2 py-1 rounded text-blue-400 font-bold">
                              8.3
                            </div>
                          </div>
                          
                          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Passes:</span>
                              <span>72 (89% accuracy)</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Tackles:</span>
                              <span>6/8 successful</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Interceptions:</span>
                              <span>7</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Ball recoveries:</span>
                              <span>12</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-sm text-gray-300">
                            <p>Al-Sahlawi was crucial in breaking up opposition attacks and initiating transitions. His positioning allowed him to intercept passing lanes consistently, and his distribution was key to building attacks.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Position Analysis</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <h4 className="text-xs font-bold text-blue-400">Defensive Line</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-400">Performance Rating</span>
                        <span className="text-blue-400 font-bold">7.5</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-full rounded-full" style={{width: '75%'}}></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-300">
                        <p>Solid defensive line with good aerial dominance. Right side showed vulnerability during transitions.</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <h4 className="text-xs font-bold text-blue-400">Midfield</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-400">Performance Rating</span>
                        <span className="text-green-400 font-bold">8.2</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-green-500 h-full rounded-full" style={{width: '82%'}}></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-300">
                        <p>Excellent control of central areas. Double pivot provided strong protection while Al-Dawsari created numerous chances.</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <h4 className="text-xs font-bold text-blue-400">Attack</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-400">Performance Rating</span>
                        <span className="text-blue-400 font-bold">7.8</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-full rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-300">
                        <p>Clinical finishing with good movement. Wingers provided width but occasionally isolated during defensive phases.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Substitution Impact</h3>
                  <div className="relative h-16 w-full bg-gray-800 rounded-lg overflow-hidden mb-3">
                    {/* Timeline showing substitution impact */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-1 bg-gray-600"></div>
                    </div>
                    
                    {/* Substitution marker */}
                    <div className="absolute top-1/2 w-4 h-4 -mt-2 bg-yellow-500 rounded-full" style={{ left: '65%' }}>
                      <div className="absolute -top-8 -left-8 bg-yellow-900 rounded px-2 py-0.5 text-xs text-white whitespace-nowrap">
                        65' Al-Shahrani → Al-Ghanim
                      </div>
                    </div>
                    
                    {/* Performance line */}
                    <svg className="absolute inset-0" viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path 
                        d="M0,15 L10,13 L20,16 L30,14 L40,17 L50,15 L60,18 L65,20 L70,15 L80,12 L90,10 L100,8" 
                        stroke="rgba(59,130,246,0.5)" 
                        strokeWidth="2" 
                        fill="none"
                      />
                      <path 
                        d="M0,15 L10,13 L20,16 L30,14 L40,17 L50,15 L60,18 L65,20" 
                        stroke="#3b82f6" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M65,20 L70,15 L80,12 L90,10 L100,8" 
                        stroke="#22c55e" 
                        strokeWidth="2" 
                        fill="none" 
                        strokeLinecap="round"
                      />
                    </svg>
                    
                    {/* Time markers */}
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-400 px-2">
                      <span>0'</span>
                      <span>15'</span>
                      <span>30'</span>
                      <span>45'</span>
                      <span>60'</span>
                      <span>75'</span>
                      <span>90'</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-2 rounded-lg">
                    <div className="flex items-center">
                      <div className="relative mr-2">
                        <img 
                          src={substitutes.find(p => p.name === "Ibrahim Al-Ghanim").imgUrl} 
                          alt="Al-Ghanim" 
                          className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-yellow-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">18</div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Ibrahim Al-Ghanim</h4>
                        <div className="flex items-center">
                          <span className="text-xs bg-blue-900 px-1 rounded mr-1">CDM</span>
                          <span className="text-xs text-gray-400">Replaced Al-Shahrani (65')</span>
                        </div>
                      </div>
                      <div className="ml-auto bg-green-900 px-2 py-1 rounded text-green-400 font-bold">
                        7.8
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-300">
                      <p>Al-Ghanim provided fresh defensive coverage, significantly improving the team's ability to counter press and recover position after losing possession. His introduction improved defensive stability by 32%.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Physical Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Total distance covered:</span>
                      <span className="font-bold">112.7 km</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Sprints:</span>
                      <span className="font-bold">184</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">High-intensity runs:</span>
                      <span className="font-bold">326</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Average team fatigue:</span>
                      <span className="font-bold text-yellow-400">42%</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-gray-800 p-2 rounded-lg">
                    <h4 className="text-xs font-bold text-blue-400 mb-1">Most Intense Player</h4>
                    <div className="flex items-center">
                      <img 
                        src={players.find(p => p.name === "Abdullah Al-Hamdan").imgUrl} 
                        alt="Al-Hamdan" 
                        className="w-8 h-8 rounded-full object-cover border border-blue-500 mr-2"
                      />
                      <div>
                        <div className="text-sm">Abdullah Al-Hamdan</div>
                        <div className="text-xs text-gray-400">12.6 km, 28 sprints</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'weaknesses' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Weaknesses & Vulnerabilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Defensive Vulnerabilities</h3>
                  
                  <div className="space-y-3">
                    {simulationResult.vulnerabilities.defensive.map((vulnerability, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-red-400">{vulnerability.zone}</h4>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${
                            vulnerability.priority === 'High' ? 'bg-red-900 text-red-300' : 
                            vulnerability.priority === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 
                            'bg-blue-900 text-blue-300'
                          }`}>
                            {vulnerability.priority} Priority
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">{vulnerability.issue}</p>
                        
                        {vulnerability.zone === "Right flank" && (
                          <div className="mt-2 relative h-32 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600">
                            {/* Field markings */}
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                            
                            {/* Vulnerability zone highlight */}
                            <div className="absolute top-0 right-0 w-1/3 h-full bg-red-500 opacity-20 animate-pulse"></div>
                            
                            {/* Attack arrow */}
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                              <defs>
                                <marker id="redArrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                                </marker>
                              </defs>
                              
                              {/* Counter-attack path */}
                              <path 
                                d="M15,15 C40,30 60,50 85,70" 
                                stroke="#ef4444" 
                                strokeWidth="2" 
                                strokeDasharray="5,3" 
                                fill="none" 
                                markerEnd="url(#redArrowhead)"
                                opacity="0.8"
                              />
                            </svg>
                            
                            {/* Full-back position */}
                            <div 
                              className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white"
                              style={{left: `85%`, top: `70%`}}
                            >
                              <span className="text-white text-xs">2</span>
                            </div>
                            
                            {/* Vulnerability explanation */}
                            <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-75 rounded px-2 py-1 text-xs text-white max-w-xs">
                              Space behind RB exploited during counter-attacks (3 chances conceded)
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="bg-red-900 bg-opacity-20 p-3 rounded-lg border border-red-800">
                      <h4 className="font-bold text-red-400 mb-1 flex items-center">
                        <AlertTriangle size={16} className="mr-1" />
                        Critical Defensive Issue
                      </h4>
                      <p className="text-sm text-gray-300">
                        The right defensive flank showed consistent vulnerability during transitions, especially when both the right-back and right-sided CDM pressed simultaneously. This created a 3v2 overload that the opposition exploited for their goal.
                      </p>
                      
                      <div className="mt-2 bg-gray-800 p-2 rounded-lg">
                        <h5 className="text-xs font-bold text-gray-300 mb-1">RECOMMENDED FIX</h5>
                        <p className="text-xs text-gray-300">
                          Practice coordinated pressing triggers with the right-back and CDM to ensure one player maintains defensive coverage. Consider modifying the RB's positioning during defensive transitions to provide more depth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Set Piece Weaknesses</h3>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-bold text-yellow-400 mb-1">Corner Kick Defending</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      The team showed inconsistent marking assignments on defensive corners, particularly at the near post where two opposition chances originated.
                    </p>
                    
                    <div className="relative h-48 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-2">
                      {/* Corner kick visualization */}
                      <div className="absolute top-0 left-0 w-1/6 h-1/6 bg-gray-700 opacity-30"></div>
                      
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        {/* Corner arc */}
                        <path 
                          d="M0,16 A16,16 0 0,1 16,0" 
                          stroke="white" 
                          strokeWidth="0.5" 
                          fill="none" 
                          opacity="0.5"
                        />
                        
                        {/* Ball path */}
                        <path 
                          d="M5,5 C15,15 20,25 25,40" 
                          stroke="white" 
                          strokeWidth="1" 
                          strokeDasharray="2,1" 
                          fill="none" 
                          opacity="0.8"
                        />
                        
                        {/* Opposition players */}
                        <circle cx="20" cy="20" r="3" fill="#ef4444" opacity="0.8" />
                        <circle cx="25" cy="35" r="3" fill="#ef4444" opacity="0.8" />
                        <circle cx="35" cy="25" r="3" fill="#ef4444" opacity="0.8" />
                        <circle cx="30" cy="45" r="3" fill="#ef4444" opacity="0.8" />
                        
                        {/* Team players */}
                        <circle cx="18" cy="25" r="3" fill="#3b82f6" opacity="0.8" />
                        <circle cx="30" cy="30" r="3" fill="#3b82f6" opacity="0.8" />
                        <circle cx="22" cy="40" r="3" fill="#3b82f6" opacity="0.8" />
                        <circle cx="40" cy="20" r="3" fill="#3b82f6" opacity="0.8" />
                        
                        {/* Vulnerability highlight */}
                        <circle cx="25" cy="35" r="6" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.8" className="animate-pulse" />
                        <path 
                          d="M25,35 L35,45" 
                          stroke="#ef4444" 
                          strokeWidth="1" 
                          strokeDasharray="2,1" 
                          fill="none" 
                          opacity="0.8"
                        />
                      </svg>
                      
                      <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 rounded px-2 py-1 text-xs">
                        <span className="text-red-400 font-bold">Near post vulnerability</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                        <span>Defensive players</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                        <span>Opposition players</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Attacking Weaknesses</h3>
                  
                  <div className="space-y-3">
                    {simulationResult.vulnerabilities.attacking.map((vulnerability, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold text-yellow-400">{vulnerability.zone}</h4>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${
                            vulnerability.priority === 'High' ? 'bg-red-900 text-red-300' : 
                            vulnerability.priority === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 
                            'bg-blue-900 text-blue-300'
                          }`}>
                            {vulnerability.priority} Priority
                          </div>
                        </div>
                        <p className="text-sm text-gray-300">{vulnerability.issue}</p>
                      </div>
                    ))}
                    
                    <div className="bg-yellow-900 bg-opacity-20 p-3 rounded-lg border border-yellow-800">
                      <h4 className="font-bold text-yellow-400 mb-1">Striker Isolation Issue</h4>
                      <p className="text-sm text-gray-300">
                        Al-Najei was frequently isolated during prolonged possession phases, receiving minimal support from midfield runners. This reduced attacking options in the final third.
                      </p>
                      
                      <div className="mt-2 relative h-40 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-2">
                        {/* Field markings */}
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                        
                        {/* Opposition defensive block */}
                        <div className="absolute top-0 left-1/4 right-1/4 h-1/2 bg-red-500 opacity-10"></div>
                        
                        {/* Team positions */}
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white"
                          style={{left: `50%`, top: `15%`}}
                        >
                          <span className="text-white text-xs">9</span>
                        </div>
                        
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white opacity-60"
                          style={{left: `50%`, top: `40%`}}
                        >
                          <span className="text-white text-xs">10</span>
                        </div>
                        
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white opacity-60"
                          style={{left: `20%`, top: `30%`}}
                        >
                          <span className="text-white text-xs">7</span>
                        </div>
                        
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border border-white opacity-60"
                          style={{left: `80%`, top: `30%`}}
                        >
                          <span className="text-white text-xs">11</span>
                        </div>
                        
                        {/* Isolation visualization */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="15" r="10" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" fill="none" />
                          
                          {/* Distance indicators */}
                          <line x1="50" y1="15" x2="50" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
                          <line x1="50" y1="15" x2="20" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
                          <line x1="50" y1="15" x2="80" y2="30" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
                        </svg>
                        
                        <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 rounded px-2 py-1 text-xs text-white">
                          Excessive distance between striker and support
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-gray-800 p-2 rounded-lg">
                        <h5 className="text-xs font-bold text-gray-300 mb-1">RECOMMENDED FIX</h5>
                        <p className="text-xs text-gray-300">
                          Implement midfielder forward runs when possession is established in the final third. Train CAM Al-Dawsari to position higher during sustained possession to reduce the gap to the striker.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Tactical Limitations</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-bold text-yellow-400 mb-1">Midfield Pressing Coordination</h4>
                      <p className="text-sm text-gray-300">
                        The team showed inconsistent pressing triggers, occasionally resulting in disjointed pressure that created passing lanes through the midfield. This occurred 7 times during the match.
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                        <span>Impact on Match Performance:</span>
                        <div className="w-24 bg-gray-700 rounded-full h-1.5 ml-2">
                          <div className="bg-yellow-500 h-full rounded-full" style={{width: '60%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-bold text-yellow-400 mb-1">Build-up Under Pressure</h4>
                      <p className="text-sm text-gray-300">
                        The center-backs showed hesitation when facing coordinated pressing, resulting in longer, less accurate passes that reduced possession retention.
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                        <span>Impact on Match Performance:</span>
                        <div className="w-24 bg-gray-700 rounded-full h-1.5 ml-2">
                          <div className="bg-yellow-500 h-full rounded-full" style={{width: '45%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-bold text-yellow-400 mb-1">Team Shape Transition</h4>
                      <p className="text-sm text-gray-300">
                        When transitioning from attack to defense, the team showed delayed recovery runs, particularly from attacking midfielders. This created temporary numerical disadvantages.
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                        <span>Impact on Match Performance:</span>
                        <div className="w-24 bg-gray-700 rounded-full h-1.5 ml-2">
                          <div className="bg-red-500 h-full rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 p-2 bg-gray-800 rounded-lg">
                    <h4 className="text-xs font-bold text-white mb-1">PRIORITY IMPROVEMENT AREAS</h4>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-gray-300">
                      <li>Defensive transition shape and recovery runs</li>
                      <li>Right flank defensive coverage during opponent counter-attacks</li>
                      <li>Coordinated pressing triggers for midfield unit</li>
                      <li>Striker support during sustained possession phases</li>
                      <li>Set piece defensive organization</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'strengths' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Team Strengths</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Tactical Strengths</h3>
                  
                  <div className="space-y-3">
                    {simulationResult.strengths.slice(0, 2).map((strength, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                        <h4 className="font-bold text-green-400 mb-1">{strength}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                          <span>Effectiveness:</span>
                          <div className="w-24 bg-gray-700 rounded-full h-1.5 ml-2">
                            <div className="bg-green-500 h-full rounded-full" style={{width: `${85 - idx * 7}%`}}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-green-900 bg-opacity-20 p-3 rounded-lg border border-green-800">
                      <h4 className="font-bold text-green-400 mb-1 flex items-center">
                        <Award size={16} className="mr-1" />
                        Midfield Control Excellence
                      </h4>
                      <p className="text-sm text-gray-300">
                        The double pivot of Al-Sahlawi and Al-Shahrani provided exceptional stability, allowing Al-Dawsari to focus on creative responsibilities. This triangular midfield structure was key to the team's possession dominance.
                      </p>
                      
                      <div className="mt-2 relative h-40 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-2">
                        {/* Field markings */}
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-50"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-50"></div>
                        <div className="absolute rounded-full border border-white opacity-30"
                             style={{width: '14%', height: '14%', left: '43%', top: '43%'}}></div>
                        
                        {/* Midfield triangle highlight */}
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                          style={{left: `35%`, top: `50%`}}
                        >
                          <span className="text-white text-xs">6</span>
                        </div>
                        
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                          style={{left: `65%`, top: `50%`}}
                        >
                          <span className="text-white text-xs">8</span>
                        </div>
                        
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                          style={{left: `50%`, top: `40%`}}
                        >
                          <span className="text-white text-xs">10</span>
                        </div>
                        
                        {/* Midfield triangle visualization */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                          <polygon 
                            points="35,50 65,50 50,40" 
                            fill="rgba(59,130,246,0.2)" 
                            stroke="#3b82f6" 
                            strokeWidth="1"
                          />
                          
                          {/* Control zone */}
                          <circle cx="50" cy="47" r="15" fill="rgba(59,130,246,0.1)" />
                        </svg>
                        
                        <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 rounded px-2 py-1 text-xs text-white">
                          <span className="text-green-400 font-bold">Strong midfield triangle</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-gray-800 p-2 rounded-lg">
                        <h5 className="text-xs font-bold text-gray-300 mb-1">MATCH STATS</h5>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="bg-gray-700 p-1 rounded text-center">
                            <div className="text-green-400 font-bold">68%</div>
                            <div className="text-gray-400">Midfield possession</div>
                          </div>
                          <div className="bg-gray-700 p-1 rounded text-center">
                            <div className="text-green-400 font-bold">92%</div>
                            <div className="text-gray-400">Passing accuracy</div>
                          </div>
                          <div className="bg-gray-700 p-1 rounded text-center">
                            <div className="text-green-400 font-bold">14</div>
                            <div className="text-gray-400">Ball recoveries</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Set Piece Effectiveness</h3>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="font-bold text-green-400 mb-1">Corner Kick Attacking</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      The team demonstrated strong aerial presence on attacking corners, scoring 1 goal and creating 2 additional chances from 6 corners taken.
                    </p>
                    
                    <div className="relative h-48 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-2">
                      {/* Corner kick visualization */}
                      <div className="absolute top-0 right-0 w-1/6 h-1/6 bg-gray-700 opacity-30"></div>
                      
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        {/* Corner arc */}
                        <path 
                          d="M100,16 A16,16 0 0,0 84,0" 
                          stroke="white" 
                          strokeWidth="0.5" 
                          fill="none" 
                          opacity="0.5"
                        />
                        
                        {/* Ball path */}
                        <path 
                          d="M95,5 C85,15 80,25 75,40" 
                          stroke="white" 
                          strokeWidth="1" 
                          strokeDasharray="2,1" 
                          fill="none" 
                          opacity="0.8"
                        />
                        
                        {/* Team attacking players */}
                        <circle cx="50" cy="15" r="3" fill="#3b82f6" opacity="0.8" />
                        <circle cx="65" cy="20" r="3" fill="#3b82f6" opacity="0.8" />
                        <circle cx="75" cy="25" r="3" fill="#3b82f6" opacity="0.8" />
                        <circle cx="75" cy="40" r="3" fill="#3b82f6" opacity="0.8" />
                        
                        {/* Opposition defenders */}
                        <circle cx="55" cy="17" r="3" fill="#ef4444" opacity="0.8" />
                        <circle cx="70" cy="25" r="3" fill="#ef4444" opacity="0.8" />
                        <circle cx="65" cy="35" r="3" fill="#ef4444" opacity="0.8" />
                        
                        {/* Goal area */}
                        <rect x="40" y="0" width="20" height="5" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="0.5" opacity="0.5" />
                        
                        {/* Scoring zone highlight */}
                        <circle cx="75" cy="25" r="6" stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.8" className="animate-pulse" />
                        
                        {/* Ball path to goal */}
                        <path 
                          d="M75,25 L50,10" 
                          stroke="#22c55e" 
                          strokeWidth="1" 
                          strokeDasharray="2,1" 
                          fill="none" 
                          opacity="0.8"
                        />
                      </svg>
                      
                      <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-80 rounded px-2 py-1 text-xs">
                        <span className="text-green-400 font-bold">Far post strength: Al-Buraikan's goal (78')</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                        <span>Attacking players</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                        <span>Opposition players</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2">Offensive Strengths</h3>
                  
                  <div className="space-y-3">
                    {simulationResult.strengths.slice(2).map((strength, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                        <h4 className="font-bold text-green-400 mb-1">{strength}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                          <span>Effectiveness:</span>
                          <div className="w-24 bg-gray-700 rounded-full h-1.5 ml-2">
                            <div className="bg-green-500 h-full rounded-full" style={{width: `${80 - idx * 5}%`}}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="bg-green-900 bg-opacity-20 p-3 rounded-lg border border-green-800">
                      <h4 className="font-bold text-green-400 mb-1 flex items-center">
                        <Award size={16} className="mr-1" />
                        Left Wing Attacking Threat
                      </h4>
                      <p className="text-sm text-gray-300">
                        Abdullah Al-Hamdan's pace and dribbling on the left wing consistently created overloads when combined with overlapping runs from Hassan Al-Otaibi, generating 5 chances from this flank.
                      </p>
                      
                      <div className="mt-2 relative h-40 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-2">
                        {/* Field markings */}
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                        
                        {/* Left wing highlight zone */}
                        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-green-500 opacity-20"></div>
                        
                        {/* Player positions */}
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                          style={{left: `20%`, top: `30%`}}
                        >
                          <span className="text-white text-xs">7</span>
                        </div>
                        
                        <div 
                          className="absolute w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 border-2 border-white"
                          style={{left: `15%`, top: `45%`}}
                        >
                          <span className="text-white text-xs">3</span>
                        </div>
                        
                        {/* Attack pattern visualization */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                          <defs>
                            <marker id="greenArrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
                            </marker>
                          </defs>
                          
                          {/* LB overlap */}
                          <path 
                            d="M15,70 C12,50 10,30 15,15" 
                            stroke="#22c55e" 
                            strokeWidth="1.5" 
                            fill="none" 
                            markerEnd="url(#greenArrowhead)"
                            opacity="0.8"
                          />
                          
                          {/* LW inside run */}
                          <path 
                            d="M20,30 C30,25 40,20 50,15" 
                            stroke="#22c55e" 
                            strokeWidth="1.5" 
                            fill="none" 
                            markerEnd="url(#greenArrowhead)"
                            opacity="0.8"
                          />
                          
                          {/* Ball movement */}
                          <path 
                            d="M15,45 C15,35 17,25 20,30 C25,28 40,20 50,15" 
                            stroke="white" 
                            strokeWidth="1" 
                            strokeDasharray="3,2" 
                            fill="none" 
                            opacity="0.6"
                          />
                        </svg>
                        
                        <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 rounded px-2 py-1 text-xs text-white">
                          <span className="text-green-400 font-bold">Effective LB-LW combination</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 bg-gray-800 p-2 rounded-lg">
                        <h5 className="text-xs font-bold text-gray-300 mb-1">KEY STATISTICS</h5>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="bg-gray-700 p-1 rounded text-center">
                            <div className="text-green-400 font-bold">5</div>
                            <div className="text-gray-400">Chances created</div>
                          </div>
                          <div className="bg-gray-700 p-1 rounded text-center">
                            <div className="text-green-400 font-bold">8</div>
                            <div className="text-gray-400">Successful dribbles</div>
                          </div>
                          <div className="bg-gray-700 p-1 rounded text-center">
                            <div className="text-green-400 font-bold">4</div>
                            <div className="text-gray-400">Crosses completed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2">Player Combinations</h3>
                  <div className="relative h-64 w-full bg-green-900 rounded-lg overflow-hidden border border-gray-600 mb-3">
                    {/* Field markings */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                    <div className="absolute rounded-full border border-white opacity-20"
                         style={{width: '14%', height: '14%', left: '43%', top: '43%'}}></div>
                    
                    {/* Passing combinations visualization */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      {/* Strong passing combinations */}
                      <path 
                        d="M35,50 C42,45 48,40 50,40" 
                        stroke="#22c55e" 
                        strokeWidth="3" 
                        fill="none" 
                        opacity="0.8"
                      />
                      
                      <path 
                        d="M65,50 C58,45 52,40 50,40" 
                        stroke="#22c55e" 
                        strokeWidth="3" 
                        fill="none" 
                        opacity="0.8"
                      />
                      
                      <path 
                        d="M50,40 C45,35 40,25 20,30" 
                        stroke="#22c55e" 
                        strokeWidth="3" 
                        fill="none" 
                        opacity="0.8"
                      />
                      
                      <path 
                        d="M50,40 C50,30 50,20 50,15" 
                        stroke="#22c55e" 
                        strokeWidth="2.5" 
                        fill="none" 
                        opacity="0.8"
                      />
                      
                      {/* Player nodes with number of passes exchanged */}
                      <g>
                        <circle cx="35" cy="50" r="5" fill="#3b82f6" />
                        <text x="35" y="50" textAnchor="middle" dy=".3em" fill="white" fontSize="4">6</text>
                      </g>
                      
                      <g>
                        <circle cx="65" cy="50" r="5" fill="#3b82f6" />
                        <text x="65" y="50" textAnchor="middle" dy=".3em" fill="white" fontSize="4">8</text>
                      </g>
                      
                      <g>
                        <circle cx="50" cy="40" r="5" fill="#3b82f6" />
                        <text x="50" y="40" textAnchor="middle" dy=".3em" fill="white" fontSize="4">10</text>
                      </g>
                      
                      <g>
                        <circle cx="20" cy="30" r="5" fill="#3b82f6" />
                        <text x="20" y="30" textAnchor="middle" dy=".3em" fill="white" fontSize="4">7</text>
                      </g>
                      
                      <g>
                        <circle cx="50" cy="15" r="5" fill="#3b82f6" />
                        <text x="50" y="15" textAnchor="middle" dy=".3em" fill="white" fontSize="4">9</text>
                      </g>
                      
                      {/* Pass counts */}
                      <g>
                        <rect x="42" y="45" width="8" height="6" fill="#333" opacity="0.8" rx="2" />
                        <text x="46" y="48" textAnchor="middle" dy=".3em" fill="white" fontSize="3">24</text>
                      </g>
                      
                      <g>
                        <rect x="58" y="45" width="8" height="6" fill="#333" opacity="0.8" rx="2" />
                        <text x="62" y="48" textAnchor="middle" dy=".3em" fill="white" fontSize="3">21</text>
                      </g>
                      
                      <g>
                        <rect x="35" y="35" width="8" height="6" fill="#333" opacity="0.8" rx="2" />
                        <text x="39" y="38" textAnchor="middle" dy=".3em" fill="white" fontSize="3">17</text>
                      </g>
                      
                      <g>
                        <rect x="50" y="28" width="8" height="6" fill="#333" opacity="0.8" rx="2" />
                        <text x="54" y="31" textAnchor="middle" dy=".3em" fill="white" fontSize="3">14</text>
                      </g>
                    </svg>
                    
                    <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 rounded px-2 py-1 text-xs text-white">
                      <span className="text-green-400 font-bold">Strong midfield-attack connections</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-2 rounded-lg">
                    <h4 className="text-xs font-bold text-blue-400 mb-2">Most Effective Combinations</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span>CDM (#6) → CAM (#10)</span>
                        <span className="text-green-400 font-bold">24 passes</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span>CDM (#8) → CAM (#10)</span>
                        <span className="text-green-400 font-bold">21 passes</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span>CAM (#10) → LW (#7)</span>
                        <span className="text-green-400 font-bold">17 passes</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span>CAM (#10) → ST (#9)</span>
                        <span className="text-green-400 font-bold">14 passes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'recommendations' && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3 text-blue-400">Recommendations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center">
                    <Book size={16} className="mr-2 text-green-400" />
                    Training Recommendations
                  </h3>
                  
                  <div className="space-y-3">
                    {trainingRecommendations.map((rec, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-blue-400">{rec.title}</h4>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${
                            rec.priority === 'High' ? 'bg-red-900 text-red-300' : 
                            rec.priority === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 
                            'bg-blue-900 text-blue-300'
                          }`}>
                            {rec.priority} Priority
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-300 mt-1">{rec.description}</p>
                        
                        <div className="mt-2 grid grid-cols-2 gap-3">
                          <div className="bg-gray-700 p-2 rounded-lg">
                            <h5 className="text-xs font-bold text-gray-400 mb-1">DRILL TYPE</h5>
                            <p className="text-xs text-gray-300">{rec.drillType}</p>
                          </div>
                          <div className="bg-gray-700 p-2 rounded-lg">
                            <h5 className="text-xs font-bold text-gray-400 mb-1">TARGET PLAYERS</h5>
                            <p className="text-xs text-gray-300">{rec.targetPlayers.join(', ')}</p>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-xs text-green-400 flex items-center">
                          <Award size={12} className="mr-1" />
                          <span>Expected Improvement: {rec.expectedImprovement}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 p-3 bg-blue-900 bg-opacity-20 rounded-lg border border-blue-800">
                    <h4 className="text-sm font-bold text-blue-400 mb-2">AI Training Plan Generator</h4>
                    <p className="text-xs text-gray-300 mb-3">
                      Generate a complete weekly training plan focused on addressing the identified weaknesses while maintaining team strengths.
                    </p>
                    <div className="flex justify-end">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm flex items-center">
                        <Zap size={14} className="mr-1" /> Generate Training Plan
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center">
                    <Layers size={16} className="mr-2 text-purple-400" />
                    Tactical Adjustments
                  </h3>
                  
                  <div className="space-y-3">
                    {/* Formation recommendation */}
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-bold text-purple-400 mb-2">Formation Modification</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-xs font-bold text-gray-400 mb-1">CURRENT (4-2-3-1)</h5>
                          <div className="relative h-32 w-full bg-green-900 bg-opacity-50 rounded-lg overflow-hidden border border-gray-600">
                            {/* Basic formation dots */}
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '50%', top: '85%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '35%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '65%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '85%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '15%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '35%', top: '50%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '65%', top: '50%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '50%', top: '40%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '20%', top: '30%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '80%', top: '30%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full" style={{left: '50%', top: '15%', transform: 'translate(-50%, -50%)'}}></div>
                            
                            {/* Vulnerability highlight */}
                            <div className="absolute top-1/3 right-0 w-1/3 h-2/3 bg-red-500 opacity-20"></div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-bold text-gray-400 mb-1">RECOMMENDED (4-3-3)</h5>
                          <div className="relative h-32 w-full bg-green-900 bg-opacity-50 rounded-lg overflow-hidden border border-gray-600">
                            {/* Basic formation dots */}
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '50%', top: '85%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '35%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '65%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '85%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '15%', top: '70%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '30%', top: '50%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '70%', top: '50%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '15%', top: '30%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '85%', top: '30%', transform: 'translate(-50%, -50%)'}}></div>
                            <div className="absolute w-3 h-3 bg-purple-600 rounded-full" style={{left: '50%', top: '25%', transform: 'translate(-50%, -50%)'}}></div>
                            
                            {/* Reinforcement highlight */}
                            <div className="absolute top-1/3 right-0 w-1/3 h-2/3 bg-green-500 opacity-20"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-300">
                        <p>Switching to a 4-3-3 would provide better coverage on the right flank during transitions by adding an additional midfielder to balance the formation. This would help address the vulnerability without sacrificing attacking options.</p>
                      </div>
                    </div>
                    
                    {/* Pressing strategy */}
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-bold text-purple-400 mb-2">Pressing Coordination</h4>
                      <p className="text-sm text-gray-300 mb-2">
                        Implement defined pressing triggers based on opponent ball position rather than individual decisions. Establish 'no-press' zones where the team maintains shape instead of committing to challenges.
                      </p>
                      
                      <div className="relative h-32 w-full bg-green-900 bg-opacity-50 rounded-lg overflow-hidden border border-gray-600 mb-2">
                        {/* Field markings */}
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-white opacity-30"></div>
                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white opacity-30"></div>
                        
                        {/* Pressing zones visualization */}
                        <div className="absolute top-0 left-0 right-0 h-1/3 bg-red-500 opacity-30"></div>
                        <div className="absolute top-1/3 left-0 right-0 h-1/3 bg-yellow-500 opacity-30"></div>
                        <div className="absolute top-2/3 left-0 right-0 h-1/3 bg-green-500 opacity-30"></div>
                        
                        <div className="absolute top-2 left-2 text-xs text-white bg-gray-800 bg-opacity-70 px-2 py-0.5 rounded">High Press Zone</div>
                        <div className="absolute top-1/3 left-2 text-xs text-white bg-gray-800 bg-opacity-70 px-2 py-0.5 rounded">Selective Press</div>
                        <div className="absolute top-2/3 left-2 text-xs text-white bg-gray-800 bg-opacity-70 px-2 py-0.5 rounded">Defensive Shape</div>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-gray-700 p-2 rounded text-center">
                          <div className="font-bold text-red-400">High Press</div>
                          <p className="text-gray-300 mt-1">When ball in final third</p>
                        </div>
                        <div className="bg-gray-700 p-2 rounded text-center">
                          <div className="font-bold text-yellow-400">Selective Press</div>
                          <p className="text-gray-300 mt-1">Trigger on back passes</p>
                        </div>
                        <div className="bg-gray-700 p-2 rounded text-center">
                          <div className="font-bold text-green-400">Maintain Shape</div>
                          <p className="text-gray-300 mt-1">Compact block formation</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Player roles adjustment */}
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <h4 className="font-bold text-purple-400 mb-2">Player Role Adjustments</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <img 
                            src={players.find(p => p.name === "Fahad Al-Muwallad").imgUrl} 
                            alt="Al-Muwallad" 
                            className="w-10 h-10 rounded-full object-cover border border-blue-500 mr-2"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <span className="font-medium">Fahad Al-Muwallad</span>
                                <span className="text-xs bg-blue-900 px-1 rounded ml-2">RB</span>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-400">Current:</span> <span className="text-blue-400">Attacking Full-back</span>
                              </div>
                            </div>
                            <div className="mt-1 flex items-center">
                              <div className="flex-1 h-1.5 bg-gray-700 rounded-full mx-2">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '80%'}}></div>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-400">New:</span> <span className="text-green-400">Defensive Winger</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <img 
                            src={players.find(p => p.name === "Abdullah Al-Hamdan").imgUrl} 
                            alt="Al-Hamdan" 
                            className="w-10 h-10 rounded-full object-cover border border-blue-500 mr-2"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <span className="font-medium">Abdullah Al-Hamdan</span>
                                <span className="text-xs bg-blue-900 px-1 rounded ml-2">LW</span>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-400">Current:</span> <span className="text-blue-400">Inside Forward</span>
                              </div>
                            </div>
                            <div className="mt-1 flex items-center">
                              <div className="flex-1 h-1.5 bg-gray-700 rounded-full mx-2">
                                <div className="bg-blue-600 h-full rounded-full" style={{width: '90%'}}></div>
                              </div>
                              <div className="text-xs">
                                <span className="text-gray-400">New:</span> <span className="text-green-400">Wide Playmaker</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-300 mt-1">
                          <p>Adjust player roles to create better balance between attack and defense. Al-Muwallad should focus more on defensive responsibilities while supporting attack when safe, and Al-Hamdan should be given more playmaking freedom to exploit his creative abilities.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center">
                    <Activity size={16} className="mr-2 text-green-400" />
                    Performance Improvement Potential
                  </h3>
                  
                  <div className="relative h-52 w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-600 mb-3">
                    {/* Performance radar chart */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      {/* Background grid */}
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      <circle cx="50" cy="50" r="20" fill="none" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      <circle cx="50" cy="50" r="10" fill="none" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      
                      <line x1="50" y1="10" x2="50" y2="90" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="10" y1="50" x2="90" y2="50" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="22" y1="22" x2="78" y2="78" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      <line x1="22" y1="78" x2="78" y2="22" stroke="#4b5563" strokeWidth="0.5" strokeDasharray="2,2" />
                      
                      {/* Current performance polygon */}
                      <polygon 
                        points="50,12 75,28 82,50 70,75 50,82 30,75 18,50 25,28" 
                        fill="rgba(59,130,246,0.2)" 
                        stroke="#3b82f6" 
                        strokeWidth="1.5"
                      />
                      
                      {/* Potential performance polygon */}
                      <polygon 
                        points="50,5 85,22 90,50 80,80 50,90 20,80 10,50 15,22" 
                        fill="rgba(34,197,94,0.1)" 
                        stroke="#22c55e" 
                        strokeWidth="1.5"
                        strokeDasharray="3,2"
                      />
                      
                      {/* Axis labels */}
                      <text x="50" y="5" textAnchor="middle" fill="#e5e7eb" fontSize="4">Attacking</text>
                      <text x="85" y="22" textAnchor="start" fill="#e5e7eb" fontSize="4">Creativity</text>
                      <text x="95" y="50" textAnchor="start" fill="#e5e7eb" fontSize="4">Possession</text>
                      <text x="80" y="85" textAnchor="middle" fill="#e5e7eb" fontSize="4">Set Pieces</text>
                      <text x="50" y="95" textAnchor="middle" fill="#e5e7eb" fontSize="4">Defending</text>
                      <text x="15" y="85" textAnchor="middle" fill="#e5e7eb" fontSize="4">Transitions</text>
                      <text x="5" y="50" textAnchor="end" fill="#e5e7eb" fontSize="4">Pressing</text>
                      <text x="15" y="22" textAnchor="end" fill="#e5e7eb" fontSize="4">Physical</text>
                    </svg>
                    
                    <div className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-80 rounded px-2 py-1 text-xs flex items-center">
                      <div className="flex items-center mr-3">
                        <div className="w-3 h-3 border border-blue-500 bg-blue-500 bg-opacity-20 mr-1"></div>
                        <span className="text-white">Current</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 border border-green-500 bg-green-500 bg-opacity-20 mr-1 border-dashed"></div>
                        <span className="text-white">Potential</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-gray-300">Team Performance</h4>
                        <div>
                          <span className="text-xs text-gray-400">Current: </span>
                          <span className="text-blue-400 font-bold">7.6</span>
                          <span className="text-xs text-gray-400 mx-1">→</span>
                          <span className="text-green-400 font-bold">8.5</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                        <div className="relative">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '76%'}}></div>
                          <div className="absolute top-0 left-0 bg-green-500 h-1.5 rounded-full opacity-50" style={{width: '85%'}}></div>
                          <div className="absolute top-0 left-0 h-1.5 border-r-2 border-white" style={{width: '76%'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-800 p-2 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-gray-300">Attacking</h4>
                          <div>
                            <span className="text-blue-400 font-bold">7.8</span>
                            <span className="text-green-400 text-xs ml-1">+1.2</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="relative">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '78%'}}></div>
                            <div className="absolute top-0 left-0 bg-green-500 h-1.5 rounded-full opacity-50" style={{width: '90%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 p-2 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-gray-300">Defending</h4>
                          <div>
                            <span className="text-blue-400 font-bold">7.2</span>
                            <span className="text-green-400 text-xs ml-1">+0.8</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                          <div className="relative">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '72%'}}></div>
                            <div className="absolute top-0 left-0 bg-green-500 h-1.5 rounded-full opacity-50" style={{width: '80%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                    <Video size={16} className="mr-2 text-blue-400" />
                    Match Strategy Planner
                  </h3>
                  
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="text-xs font-bold text-blue-400 mb-2">Next Match Preparation</h4>
                    
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg mr-3">
                      <Trophy size={24} className="text-blue-400" />

                      </div>
                      <div>
                        <div className="font-bold">Al-Ahli</div>
                        <div className="text-xs text-gray-400">League Match - Away - 15 Apr 2025</div>
                      </div>
                      <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-full text-xs flex items-center">
                        <Eye size={12} className="mr-1" />
                        Scout Report
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Formation Recommendation:</span>
                        <span className="font-bold text-purple-400">4-3-3</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Tactical Focus:</span>
                        <span className="font-bold text-purple-400">Counter Attack</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Key Player to Target:</span>
                        <span className="font-bold text-purple-400">Left CB (Slow turning)</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Win Probability:</span>
                        <span className="font-bold text-green-400">67%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-center">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-1.5 px-4 rounded text-sm flex items-center shadow-lg">
                        <Zap size={14} className="mr-1" />
                        Prepare Match Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

{reportTab === 'video' && (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {/* ... other elements ... */}
        <div className="md:col-span-1">
        <div className="max-w-auto mx-auto">
          <div className="bg-gray-700 p-3 rounded-lg">
            <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
              <div className="absolute inset-0 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                {!isVideoPlaying ? (
                   // --- Placeholder ---
                   <div className="text-center">
                     {/* ... placeholder content ... */}
                     <div className="mt-4">
                       <button 
                         onClick={() => setIsVideoPlaying(true)} // This stays the same
                         className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white py-2 px-5 rounded-full flex items-center mx-auto"
                       >
                         <Play size={16} className="mr-2" />
                         Play Full Match
                       </button>
                     </div>
                   </div>
                ) : (
                  // --- Video Player ---
                  <video
                    // The src now uses the relative path served by the dev server
                    src={videoUrl} 
                    controls
                    autoPlay
                    muted
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <h3 className="text-xs font-bold text-gray-300 mb-2">Visualization Options</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <label htmlFor="showHeatmap" className="flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              id="showHeatmap" 
                              className="mr-2"
                              defaultChecked={true}
                            />
                            <span>Player Heatmaps</span>
                          </label>
                          <div className="bg-blue-900 px-2 py-0.5 rounded-full text-blue-200">Enabled</div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <label htmlFor="showPassingLines" className="flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              id="showPassingLines" 
                              className="mr-2"
                              defaultChecked={true}
                            />
                            <span>Passing Networks</span>
                          </label>
                          <div className="bg-blue-900 px-2 py-0.5 rounded-full text-blue-200">Enabled</div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <label htmlFor="showPlayerStats" className="flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              id="showPlayerStats" 
                              className="mr-2"
                              defaultChecked={true}
                            />
                            <span>Real-time Player Stats</span>
                          </label>
                          <div className="bg-blue-900 px-2 py-0.5 rounded-full text-blue-200">Enabled</div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <label htmlFor="showAIInsights" className="flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              id="showAIInsights" 
                              className="mr-2"
                              defaultChecked={true}
                            />
                            <span>AI Tactical Insights</span>
                          </label>
                          <div className="bg-blue-900 px-2 py-0.5 rounded-full text-blue-200">Enabled</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 p-2 rounded-lg">
                      <h3 className="text-xs font-bold text-gray-300 mb-2">Video Controls</h3>
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">Playback Speed</label>
                          <select 
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            defaultValue="1"
                          >
                            <option value="0.25">0.25x (Slow motion)</option>
                            <option value="0.5">0.5x (Slow)</option>
                            <option value="1">1x (Normal)</option>
                            <option value="2">2x (Fast)</option>
                            <option value="4">4x (Very fast)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">Commentary Mode</label>
                          <select 
                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-full text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            defaultValue="ai"
                          >
                            <option value="none">No Commentary</option>
                            <option value="basic">Basic Stats</option>
                            <option value="ai">AI Tactical Commentary</option>
                            <option value="detailed">Detailed Analysis</option>
                          </select>
                        </div>
                        
                        <div className="pt-2 flex justify-between">
                          <button className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg text-xs flex items-center">
                            <Download size={12} className="mr-1" />
                            Save Video
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-lg text-xs flex items-center">
                            <Share size={12} className="mr-1" />
                            Share Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              
              <div>
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                    <FileText size={16} className="mr-2 text-blue-400" />
                    Key Moments
                  </h3>
                  
                  <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                    {simulationResult.keyChances.map((chance, idx) => (
                      <div key={idx} className="bg-gray-800 p-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                              chance.outcome === 'Scored' ? 'bg-green-700' : 
                              chance.outcome === 'Saved' ? 'bg-yellow-700' : 
                              'bg-red-700'
                            }`}>
                              <span className="text-xs text-white">{chance.minute}'</span>
                            </div>
                            <span className="font-bold text-sm">{chance.player}</span>
                          </div>
                          <div className={`text-xs ${
                            chance.outcome === 'Scored' ? 'text-green-400' : 
                            chance.outcome === 'Saved' ? 'text-yellow-400' : 
                            'text-red-400'
                          }`}>
                            {chance.outcome}
                          </div>
                        </div>
                        <div className="flex items-center mt-1 text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${
                            chance.team === 'home' ? 'bg-blue-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-gray-400">{chance.type}</span>
                          <span className="mx-1">•</span>
                          <span>xG: {chance.xG}</span>
                          <button className="ml-auto text-blue-400 hover:text-blue-300 flex items-center">
                            <Play size={12} className="mr-1" />
                            Play
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center">
                    <BarChart2 size={16} className="mr-2 text-blue-400" />
                    Match Timeline
                  </h3>
                  
                  <div className="relative h-16 w-full bg-gray-800 rounded-lg overflow-hidden mb-3">
                    {/* Timeline visualization */}
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-600"></div>
                    
                    {/* First half */}
                    <div className="absolute top-1 left-2 text-xs text-gray-400">1H</div>
                    <div className="absolute top-1/2 left-0 bottom-0 w-1/2 border-r border-gray-500 flex items-end pb-1">
                      <div className="w-full h-1/3 relative">
                        {matchEvents.filter(e => e.time <= 45).map((event, idx) => (
                          <div 
                            key={idx}
                            className={`absolute top-0 w-2 h-2 -mt-1 rounded-full ${
                              event.goal ? (event.homeAction ? 'bg-blue-500' : 'bg-red-500') : 
                              event.alert ? 'bg-yellow-500' : 
                              'bg-gray-400'
                            }`}
                            style={{ left: `${(event.time / 45) * 100}%` }}
                            title={event.event}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Second half */}
                    <div className="absolute top-1 right-2 text-xs text-gray-400">2H</div>
                    <div className="absolute top-1/2 right-0 bottom-0 w-1/2 flex items-end pb-1">
                      <div className="w-full h-1/3 relative">
                        {matchEvents.filter(e => e.time > 45).map((event, idx) => (
                          <div 
                            key={idx}
                            className={`absolute top-0 w-2 h-2 -mt-1 rounded-full ${
                              event.goal ? (event.homeAction ? 'bg-blue-500' : 'bg-red-500') : 
                              event.alert ? 'bg-yellow-500' : 
                              'bg-gray-400'
                            }`}
                            style={{ left: `${((event.time - 45) / 45) * 100}%` }}
                            title={event.event}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Time markers */}
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-xs text-gray-400 px-2">
                      <span>0'</span>
                      <span>15'</span>
                      <span>30'</span>
                      <span>45'</span>
                      <span>60'</span>
                      <span>75'</span>
                      <span>90'</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 text-xs justify-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                      <span className="text-gray-300">Home Goal</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                      <span className="text-gray-300">Away Goal</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                      <span className="text-gray-300">Alert</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                      <span className="text-gray-300">Event</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button 
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded flex items-center transition-colors duration-200"
            onClick={() => setCurrentPage('simulation')}
          >
            <ArrowLeft className="mr-1" size={16} />
            Back to Simulation
          </button>
          <button 
            className="py-2 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded flex items-center transition-colors duration-200"
          >
            <Save size={16} className="mr-2" />
            Save Analysis Report
          </button>
        </div>
      </div>
    </div>
  )}

  // Main component rendering based on current page
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <NavigationBar />
      <NotificationsPanel />
      
      {currentPage === 'welcome' && <WelcomePage />}
      {currentPage === 'team-setup' && <TeamSetupPage />}
      {currentPage === 'opponent-setup' && <OpponentSetupPage />}
      {currentPage === 'ai-agents' && <AIAgentsPage />}
      {currentPage === 'simulation' && <SimulationPage />}
      {currentPage === 'report' && <ReportPage />}
    </div>
  );
};

export default TactiVisionAURADashboard;