const rawExtraPlayersText = `
David de Gea|Spain|Premier League|Manchester United|GK|90|top
Ederson|Brazil|Premier League|Manchester City|GK|90|top
Gianluigi Donnarumma|Italy|Ligue 1 McDonald's|PSG|GK|89|top
Mike Maignan|France|Serie A|AC Milan|GK|89|top
Pepe Reina|Spain|Premier League|Liverpool|GK|86|good
Francesco Toldo|Italy|Serie A|Inter Milan|GK|86|good
Sebastien Frey|France|Serie A|Fiorentina|GK|85|good
Christian Abbiati|Italy|Serie A|AC Milan|GK|84|good
Jerzy Dudek|Poland|Premier League|Liverpool|GK|82|good
Doni|Brazil|Serie A|Roma|GK|81|good
Salvatore Sirigu|Italy|Ligue 1 McDonald's|PSG|GK|82|good
Guillermo Ochoa|Mexico|Ligue 1 McDonald's|Ajaccio|GK|81|good
Asmir Begovic|Bosnia|Premier League|Stoke City|GK|81|good
Mark Schwarzer|Australia|Premier League|Fulham|GK|82|good
Jussi Jaaskelainen|Finland|Premier League|Bolton|GK|81|good
Shay Given|Ireland|Premier League|Newcastle|GK|84|good
Paul Robinson|England|Premier League|Tottenham|GK|80|good
Carlo Cudicini|Italy|Premier League|Chelsea|GK|82|good
Fabien Barthez|France|Premier League|Manchester United|GK|84|good
Sander Westerveld|Netherlands|Premier League|Liverpool|GK|79|rotation
Robert Green|England|Premier League|West Ham|GK|78|rotation
Ben Foster|England|Premier League|Watford|GK|78|rotation
Boaz Myhill|Wales|Premier League|West Brom|GK|73|weak
Wayne Hennessey|Wales|Premier League|Crystal Palace|GK|74|weak
Heurelho Gomes|Brazil|Premier League|Tottenham|GK|76|rotation
Maarten Stekelenburg|Netherlands|Premier League|Everton|GK|74|weak
Craig Gordon|Scotland|Premier League|Sunderland|GK|76|rotation
Brad Guzan|USA|Premier League|Aston Villa|GK|73|weak
Roberto|Spain|Premier League|West Ham|GK|70|weak
Costel Pantilimon|Romania|Premier League|Sunderland|GK|72|weak
Ricardo Carvalho|Portugal|Premier League|Chelsea|CB|89|top
Sol Campbell|England|Premier League|Arsenal|CB|88|top
Walter Samuel|Argentina|Serie A|Inter Milan|CB|88|top
Ivan Cordoba|Colombia|Serie A|Inter Milan|CB|87|top
Jaap Stam|Netherlands|Serie A|AC Milan|CB|88|top
Ruben Dias|Portugal|Premier League|Manchester City|CB|90|top
Antonio Rudiger|Germany|La Liga|Real Madrid|CB|88|top
William Saliba|France|Premier League|Arsenal|CB|88|top
Alessandro Bastoni|Italy|Serie A|Inter Milan|CB|87|good
Matthijs de Ligt|Netherlands|Bundesliga|Bayern Munich|CB|86|good
Ronald Araujo|Uruguay|La Liga|Barcelona|CB|86|good
Toby Alderweireld|Belgium|Premier League|Tottenham|CB|85|good
Jan Vertonghen|Belgium|Premier League|Tottenham|CB|85|good
Laurent Koscielny|France|Premier League|Arsenal|CB|84|good
Kolo Toure|Ivory Coast|Premier League|Arsenal|CB|84|good
William Gallas|France|Premier League|Chelsea|CB|84|good
Gary Cahill|England|Premier League|Chelsea|CB|82|good
Daniel Agger|Denmark|Premier League|Liverpool|CB|81|good
Martin Skrtel|Slovakia|Premier League|Liverpool|CB|80|rotation
Per Mertesacker|Germany|Premier League|Arsenal|CB|80|rotation
Joleon Lescott|England|Premier League|Manchester City|CB|79|rotation
Matthew Upson|England|Premier League|West Ham|CB|78|rotation
Ryan Shawcross|England|Premier League|Stoke City|CB|78|rotation
Robert Huth|Germany|Premier League|Stoke City|CB|78|rotation
Brede Hangeland|Norway|Premier League|Fulham|CB|78|rotation
Chris Samba|Congo|Premier League|Blackburn|CB|77|rotation
Michael Dawson|England|Premier League|Tottenham|CB|79|rotation
Jonathan Woodgate|England|Premier League|Tottenham|CB|80|rotation
Sylvain Distin|France|Premier League|Everton|CB|78|rotation
Richard Dunne|Ireland|Premier League|Aston Villa|CB|78|rotation
Fabricio Coloccini|Argentina|Premier League|Newcastle|CB|78|rotation
Gary Pallister|England|Premier League|Middlesbrough|CB|76|rotation
David Wheater|England|Premier League|Bolton|CB|73|weak
Anton Ferdinand|England|Premier League|West Ham|CB|73|weak
Nedum Onuoha|England|Premier League|Manchester City|CB|72|weak
Titus Bramble|England|Premier League|Newcastle|CB|70|weak
Jean-Alain Boumsong|France|Premier League|Newcastle|CB|69|weak
Sebastien Squillaci|France|Premier League|Arsenal|CB|70|weak
Pascal Cygan|France|Premier League|Arsenal|CB|69|weak
Tal Ben Haim|Israel|Premier League|Chelsea|CB|71|weak
Roque Junior|Brazil|Premier League|Leeds United|CB|67|weak
Lauren|Cameroon|Premier League|Arsenal|RB|84|good
Pablo Zabaleta|Argentina|Premier League|Manchester City|RB|84|good
Branislav Ivanovic|Serbia|Premier League|Chelsea|RB|85|good
Steve Finnan|Ireland|Premier League|Liverpool|RB|81|good
Stephen Carr|Ireland|Premier League|Tottenham|RB|80|good
Seamus Coleman|Ireland|Premier League|Everton|RB|79|rotation
Phil Bardsley|Scotland|Premier League|Sunderland|RB|73|weak
Alan Hutton|Scotland|Premier League|Tottenham|RB|72|weak
Stephen Kelly|Ireland|Premier League|Fulham|RB|70|weak
John Pantsil|Ghana|Premier League|Fulham|RB|71|weak
Sebastien Corchia|France|Ligue 1 McDonald's|Lille|RB|77|rotation
Cicinho|Brazil|La Liga|Real Madrid|RB|78|rotation
Michel Salgado|Spain|La Liga|Real Madrid|RB|83|good
Christian Panucci|Italy|Serie A|Roma|RB|82|good
Fabio Grosso|Italy|Serie A|Inter Milan|LB|83|good
Maxwell|Brazil|Ligue 1 McDonald's|PSG|LB|82|good
Eric Abidal|France|La Liga|Barcelona|LB|86|good
Joan Capdevila|Spain|La Liga|Villarreal|LB|82|good
Nacho Monreal|Spain|Premier League|Arsenal|LB|80|rotation
Stephen Warnock|England|Premier League|Blackburn|LB|76|rotation
Paul Konchesky|England|Premier League|Liverpool|LB|70|weak
Andre Santos|Brazil|Premier League|Arsenal|LB|69|weak
Wayne Bridge|England|Premier League|Chelsea|LB|80|rotation
Nicky Shorey|England|Premier League|Reading|LB|74|weak
John Arne Riise|Norway|Premier League|Liverpool|LB|82|good
Ian Harte|Ireland|Premier League|Leeds United|LB|78|rotation
Maynor Figueroa|Honduras|Premier League|Wigan|LB|73|weak
Jose Enrique|Spain|Premier League|Liverpool|LB|78|rotation
Patrick Vieira|France|Premier League|Arsenal|CM|91|top
Roy Keane|Ireland|Premier League|Manchester United|CDM|90|top
Ruud Gullit|Netherlands|Premier League|Chelsea|CAM|90|top
Juan Roman Riquelme|Argentina|La Liga|Villarreal|CAM|90|top
Aimar|Argentina|La Liga|Valencia|CAM|88|top
Deco|Portugal|La Liga|Barcelona|CM|89|top
Juan Sebastian Veron|Argentina|Premier League|Manchester United|CM|86|good
Mikel Arteta|Spain|Premier League|Arsenal|CM|84|good
Morten Gamst Pedersen|Norway|Premier League|Blackburn|LM|81|good
Gary Speed|Wales|Premier League|Newcastle|CM|82|good
Scott Parker|England|Premier League|West Ham|CM|82|good
Gareth Barry|England|Premier League|Aston Villa|CM|83|good
Lee Bowyer|England|Premier League|Leeds United|CM|80|good
Jermaine Jenas|England|Premier League|Tottenham|CM|78|rotation
Steed Malbranque|France|Premier League|Tottenham|RM|78|rotation
Kevin Nolan|England|Premier League|Bolton|CM|79|rotation
Tim Cahill|Australia|Premier League|Everton|CAM|82|good
Marouane Fellaini|Belgium|Premier League|Everton|CM|80|rotation
Leon Osman|England|Premier League|Everton|CM|77|rotation
Steven Pienaar|South Africa|Premier League|Everton|LM|78|rotation
Darron Gibson|Ireland|Premier League|Manchester United|CM|72|weak
David Bentley|England|Premier League|Tottenham|RM|76|rotation
Jermaine Pennant|England|Premier League|Liverpool|RM|75|weak
Charles N'Zogbia|France|Premier League|Wigan|LM|77|rotation
Matt Jarvis|England|Premier League|Wolves|LM|74|weak
Ashley Young|England|Premier League|Aston Villa|LW|82|good
James Ward-Prowse|England|Premier League|Southampton|CM|82|good
Mark Noble|England|Premier League|West Ham|CM|77|rotation
Nigel Reo-Coker|England|Premier League|Aston Villa|CM|74|weak
Lee Cattermole|England|Premier League|Sunderland|CDM|71|weak
Jack Colback|England|Premier League|Newcastle|CM|70|weak
Dickson Etuhu|Nigeria|Premier League|Fulham|CDM|70|weak
Wilson Palacios|Honduras|Premier League|Tottenham|CDM|76|rotation
Mohamed Diame|Senegal|Premier League|West Ham|CM|74|weak
Cheick Tiote|Ivory Coast|Premier League|Newcastle|CDM|77|rotation
Yohan Cabaye|France|Premier League|Newcastle|CM|82|good
Hatem Trabelsi|Tunisia|Premier League|Manchester City|RM|73|weak
Ramires|Brazil|Premier League|Chelsea|CM|84|good
Oscar Chelsea|Brazil|Premier League|Chelsea|CAM|84|good
Salomon Kalou|Ivory Coast|Premier League|Chelsea|RW|78|rotation
Damien Duff|Ireland|Premier League|Chelsea|LM|83|good
Luis Garcia|Spain|Premier League|Liverpool|CAM|81|good
Xabi Prieto|Spain|La Liga|Real Sociedad|RM|82|good
Joan Verdu|Spain|La Liga|Espanyol|CAM|78|rotation
Borja Valero|Spain|La Liga|Villarreal|CM|82|good
Ever Banega|Argentina|La Liga|Valencia|CM|82|good
Vicente|Spain|La Liga|Valencia|LM|85|good
Joaquin|Spain|La Liga|Real Betis|RM|86|good
Pablo Hernandez|Spain|La Liga|Valencia|RW|79|rotation
Ruben Baraja|Spain|La Liga|Valencia|CM|85|good
David Albelda|Spain|La Liga|Valencia|CDM|82|good
Mahamadou Diarra|Mali|La Liga|Real Madrid|CDM|83|good
Lassana Diarra|France|La Liga|Real Madrid|CDM|82|good
Esteban Granero|Spain|La Liga|Real Madrid|CM|77|rotation
Pedro Leon|Spain|La Liga|Real Madrid|RM|74|weak
Simao|Portugal|La Liga|Atletico Madrid|LM|84|good
Jose Antonio Reyes|Spain|La Liga|Atletico Madrid|LW|82|good
Maxi Rodriguez|Argentina|La Liga|Atletico Madrid|RM|84|good
Tiago Mendes|Portugal|La Liga|Atletico Madrid|CM|80|rotation
Raul Garcia|Spain|La Liga|Atletico Madrid|CAM|81|good
Seydou Keita|Mali|La Liga|Barcelona|CM|82|good
Thiago Motta|Italy|Serie A|Inter Milan|CDM|84|good
Esteban Cambiasso|Argentina|Serie A|Inter Milan|CDM|88|top
Cristian Zanetti|Italy|Serie A|Inter Milan|CDM|80|rotation
Sulley Muntari|Ghana|Serie A|Inter Milan|CM|78|rotation
Riccardo Montolivo|Italy|Serie A|Fiorentina|CM|82|good
Alberto Aquilani|Italy|Serie A|Roma|CM|80|rotation
Simone Perrotta|Italy|Serie A|Roma|CM|82|good
David Pizarro|Chile|Serie A|Roma|CM|82|good
Angelo Palombo|Italy|Serie A|Sampdoria|CDM|80|rotation
Cristiano Zanetti|Italy|Serie A|Juventus|CDM|78|rotation
Felipe Melo|Brazil|Serie A|Juventus|CDM|79|rotation
Claudio Marchisio|Italy|Serie A|Juventus|CM|84|good
Antonio Candreva|Italy|Serie A|Lazio|RM|82|good
Hernanes|Brazil|Serie A|Lazio|CAM|83|good
Mauro Camoranesi|Italy|Serie A|Juventus|RM|85|good
Simone Pepe|Italy|Serie A|Juventus|RW|76|rotation
Aaron Hunt|Germany|Bundesliga|Werder Bremen|CAM|78|rotation
Diego Ribas|Brazil|Bundesliga|Werder Bremen|CAM|86|good
Zvjezdan Misimovic|Bosnia|Bundesliga|Wolfsburg|CAM|83|good
Grafite|Brazil|Bundesliga|Wolfsburg|ST|84|good
Christian Gentner|Germany|Bundesliga|Stuttgart|CM|76|rotation
Simon Rolfes|Germany|Bundesliga|Bayer Leverkusen|CDM|80|rotation
Hakan Calhanoglu Leverkusen|Turkey|Bundesliga|Bayer Leverkusen|CAM|82|good
Lars Bender|Germany|Bundesliga|Bayer Leverkusen|CDM|82|good
Sven Bender|Germany|Bundesliga|Borussia Dortmund|CDM|80|rotation
Kevin Grosskreutz|Germany|Bundesliga|Borussia Dortmund|RM|76|rotation
Jakub Blaszczykowski|Poland|Bundesliga|Borussia Dortmund|RM|82|good
Sebastian Kehl|Germany|Bundesliga|Borussia Dortmund|CDM|79|rotation
Mathieu Valbuena|France|Ligue 1 McDonald's|Marseille|CAM|82|good
Mamadou Niang|Senegal|Ligue 1 McDonald's|Marseille|LW|82|good
Marvin Martin|France|Ligue 1 McDonald's|Sochaux|CAM|78|rotation
Etienne Capoue|France|Ligue 1 McDonald's|Toulouse|CDM|78|rotation
Rio Mavuba|France|Ligue 1 McDonald's|Lille|CDM|78|rotation
Morgan Amalfitano|France|Ligue 1 McDonald's|Marseille|RM|76|rotation
Ruud van Nistelrooy|Netherlands|Premier League|Manchester United|ST|90|top
Raul|Spain|La Liga|Real Madrid|ST|90|top
David Trezeguet|France|Serie A|Juventus|ST|89|top
Hernan Crespo|Argentina|Serie A|Inter Milan|ST|88|top
Adriano|Brazil|Serie A|Inter Milan|ST|88|top
Carlos Tevez|Argentina|Premier League|Manchester City|ST|89|top
Luca Toni|Italy|Serie A|Fiorentina|ST|87|good
Antonio Di Natale|Italy|Serie A|Udinese|ST|87|good
Roy Makaay|Netherlands|Bundesliga|Bayern Munich|ST|87|good
Darren Bent|England|Premier League|Sunderland|ST|82|good
Mark Viduka|Australia|Premier League|Leeds United|ST|82|good
Kevin Davies|England|Premier League|Bolton|ST|78|rotation
Bobby Zamora|England|Premier League|Fulham|ST|78|rotation
Jason Roberts|Grenada|Premier League|Blackburn|ST|74|weak
Kevin Doyle|Ireland|Premier League|Wolves|ST|76|rotation
Kenwyne Jones|Trinidad and Tobago|Premier League|Sunderland|ST|75|weak
Robbie Earnshaw|Wales|Premier League|West Brom|ST|72|weak
Marlon Harewood|England|Premier League|West Ham|ST|72|weak
Carlton Cole|England|Premier League|West Ham|ST|74|weak
Emile Heskey|England|Premier League|Aston Villa|ST|74|weak
Louis Saha|France|Premier League|Everton|ST|80|rotation
Craig Bellamy|Wales|Premier League|Liverpool|ST|80|rotation
Dirk Kuyt|Netherlands|Premier League|Liverpool|RW|82|good
Milan Baros|Czech Republic|Premier League|Liverpool|ST|76|rotation
Djibril Cisse|France|Premier League|Liverpool|ST|80|rotation
Djibril Cisse QPR|France|Premier League|Queens Park Rangers|ST|74|weak
Fernando Morientes|Spain|Premier League|Liverpool|ST|78|rotation
Robbie Fowler|England|Premier League|Liverpool|ST|80|rotation
Craig Fagan|England|Premier League|Hull City|ST|68|weak
Michael Ricketts|England|Premier League|Bolton|ST|70|weak
Benjani|Zimbabwe|Premier League|Portsmouth|ST|75|weak
Afonso Alves|Brazil|Premier League|Middlesbrough|ST|72|weak
Helder Postiga|Portugal|Premier League|Tottenham|ST|70|weak
Mateja Kezman|Serbia|Premier League|Chelsea|ST|72|weak
Andriy Voronin|Ukraine|Premier League|Liverpool|ST|72|weak
Kris Boyd|Scotland|Premier League|Middlesbrough|ST|69|weak
Jay Bothroyd|England|Premier League|Queens Park Rangers|ST|68|weak
DJ Campbell|England|Premier League|Blackpool|ST|70|weak
Grant Holt|England|Premier League|Norwich City|ST|74|weak
Rickie Lambert|England|Premier League|Southampton|ST|78|rotation
Charlie Austin|England|Premier League|Queens Park Rangers|ST|76|rotation
Michu|Spain|Premier League|Swansea City|ST|80|rotation
Wilfried Bony|Ivory Coast|Premier League|Swansea City|ST|80|rotation
Bafetimbi Gomis|France|Premier League|Swansea City|ST|76|rotation
Arouna Kone|Ivory Coast|Premier League|Everton|ST|72|weak
Nikica Jelavic|Croatia|Premier League|Everton|ST|74|weak
Steven Fletcher|Scotland|Premier League|Sunderland|ST|74|weak
Fraizer Campbell|England|Premier League|Sunderland|ST|70|weak
Connor Wickham|England|Premier League|Sunderland|ST|69|weak
Tuncay Sanli|Turkey|Premier League|Middlesbrough|ST|76|rotation
Demba Ba|Senegal|Premier League|Newcastle|ST|82|good
Papiss Cisse|Senegal|Premier League|Newcastle|ST|80|rotation
Loic Remy Newcastle|France|Premier League|Newcastle|ST|80|rotation
Obafemi Martins|Nigeria|Premier League|Newcastle|ST|80|rotation
Shola Ameobi|Nigeria|Premier League|Newcastle|ST|70|weak
Ayoze Perez|Spain|Premier League|Newcastle|ST|74|weak
Nolberto Solano|Peru|Premier League|Newcastle|RM|80|rotation
Jonas Gutierrez|Argentina|Premier League|Newcastle|LM|76|rotation
Jay-Jay Okocha|Nigeria|Premier League|Bolton|CAM|84|good
El Hadji Diouf|Senegal|Premier League|Bolton|ST|74|weak
Robinho|Brazil|Premier League|Manchester City|LW|84|good
Elano|Brazil|Premier League|Manchester City|CAM|80|rotation
Stephen Ireland|Ireland|Premier League|Manchester City|CAM|77|rotation
Martin Petrov|Bulgaria|Premier League|Manchester City|LM|78|rotation
Valeri Bojinov|Bulgaria|Premier League|Manchester City|ST|70|weak
Giovanni Elber|Brazil|Bundesliga|Bayern Munich|ST|86|good
Stefan Kiessling|Germany|Bundesliga|Bayer Leverkusen|ST|82|good
Lucas Barrios|Paraguay|Bundesliga|Borussia Dortmund|ST|82|good
Cacau|Germany|Bundesliga|Stuttgart|ST|78|rotation
Vedad Ibisevic|Bosnia|Bundesliga|Hoffenheim|ST|80|rotation
Ivan Klasnic|Croatia|Bundesliga|Werder Bremen|ST|80|rotation
Mladen Petric|Croatia|Bundesliga|Hamburg|ST|79|rotation
Kevin Volland|Germany|Bundesliga|Bayer Leverkusen|ST|80|rotation
Julian Schieber|Germany|Bundesliga|Borussia Dortmund|ST|70|weak
Alexander Meier|Germany|Bundesliga|Eintracht Frankfurt|CAM|80|rotation
Ciro Immobile Dortmund|Italy|Bundesliga|Borussia Dortmund|ST|74|weak
Paco Alcacer|Spain|Bundesliga|Borussia Dortmund|ST|80|rotation
Roberto Soldado|Spain|La Liga|Valencia|ST|84|good
Aritz Aduriz|Spain|La Liga|Athletic Bilbao|ST|84|good
Fernando Llorente|Spain|La Liga|Athletic Bilbao|ST|84|good
Nihat Kahveci|Turkey|La Liga|Real Sociedad|ST|82|good
Roy Makaay Deportivo|Netherlands|La Liga|Deportivo La Coruna|ST|86|good
Diego Tristan|Spain|La Liga|Deportivo La Coruna|ST|84|good
Walter Pandiani|Uruguay|La Liga|Deportivo La Coruna|ST|78|rotation
Albert Luque|Spain|La Liga|Deportivo La Coruna|LW|78|rotation
Dani Guiza|Spain|La Liga|Mallorca|ST|80|rotation
Alvaro Negredo|Spain|La Liga|Sevilla|ST|82|good
Luis Fabiano|Brazil|La Liga|Sevilla|ST|86|good
Javier Saviola|Argentina|La Liga|Barcelona|ST|80|rotation
Patrick Kluivert|Netherlands|La Liga|Barcelona|ST|86|good
Pedro Munitis|Spain|La Liga|Real Madrid|LW|74|weak
Klaas-Jan Huntelaar|Netherlands|La Liga|Real Madrid|ST|80|rotation
Julio Baptista|Brazil|La Liga|Real Madrid|CAM|80|rotation
Antonio Cassano|Italy|La Liga|Real Madrid|ST|78|rotation
Giuseppe Rossi|Italy|La Liga|Villarreal|ST|84|good
Nilmar|Brazil|La Liga|Villarreal|ST|80|rotation
Gerard Moreno|Spain|La Liga|Villarreal|ST|84|good
Kevin Gameiro|France|Ligue 1 McDonald's|PSG|ST|80|rotation
Moussa Sow|Senegal|Ligue 1 McDonald's|Lille|ST|80|rotation
Lisandro Lopez|Argentina|Ligue 1 McDonald's|Lyon|ST|84|good
Bafetimbi Gomis Lyon|France|Ligue 1 McDonald's|Lyon|ST|80|rotation
Papa Bouba Diop|Senegal|Premier League|Fulham|CDM|76|rotation
Gary O'Neil|England|Premier League|Portsmouth|CM|75|weak
Mikael Forssell|Finland|Premier League|Birmingham City|ST|75|weak
Henri Camara|Senegal|Premier League|Wigan|ST|74|weak
Diomansy Kamara|Senegal|Premier League|Fulham|ST|74|weak
`;

export const extraPlayers = rawExtraPlayersText
  .trim()
  .split("\n")
  .map((line, index) => {
    const [name, nation, league, club, position, rating, tier] = line.split("|");

    return {
      id: 1001 + index,
      name,
      nation,
      league,
      club,
      position,
      rating: Number(rating),
      tier,
    };
  });