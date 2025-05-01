/**
 * Tech Theme Enhancements
 * Additional interactive technology-themed elements for portfolio
 */

document.addEventListener('DOMContentLoaded', function() {
  // Dark mode toggle functionality
  const bodyElement = document.getElementById('page-body');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.checked = true;
    }
  } else if (savedTheme === 'light') {
    bodyElement.classList.remove('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.checked = false;
    }
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    bodyElement.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.checked = true;
    }
  }
  
  // Add event listener to theme toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        bodyElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        bodyElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // Add dark mode toggle switch to sidebar if it doesn't exist
  const navMenu = document.querySelector('.navmenu');
  if (navMenu && !document.querySelector('.dark-mode-toggle')) {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'dark-mode-toggle';
    toggleContainer.innerHTML = `
      <span class="toggle-switch">
        <input type="checkbox" id="dark-mode-toggle" class="toggle-input">
        <label for="dark-mode-toggle" class="toggle-label">
          <span class="toggle-slider"></span>
          <i class="bi bi-sun light-icon"></i>
          <i class="bi bi-moon-stars dark-icon"></i>
        </label>
      </span>
    `;
    
    navMenu.parentNode.insertBefore(toggleContainer, navMenu.nextSibling);
    
    // Reapply event listener
    const newToggle = document.getElementById('dark-mode-toggle');
    if (newToggle) {
      // Set initial state
      if (bodyElement.classList.contains('dark-mode')) {
        newToggle.checked = true;
      }
      
      newToggle.addEventListener('change', function() {
        if (this.checked) {
          bodyElement.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark');
        } else {
          bodyElement.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  }
  
  // Custom typewriter effect for the About section terminal
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const originalText = typewriterElement.textContent.trim();
    typewriterElement.textContent = '';
    
    // Add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    typewriterElement.appendChild(cursor);
    
    // Typewriter effect function
    let charIndex = 0;
    function typeEffect() {
      if (charIndex < originalText.length) {
        if (typewriterElement.childNodes.length === 1) {
          // Insert text node before cursor
          typewriterElement.insertBefore(document.createTextNode(''), cursor);
        }
        
        // Add next character
        typewriterElement.firstChild.textContent += originalText.charAt(charIndex);
        charIndex++;
        
        // Random typing speed for more realistic effect
        setTimeout(typeEffect, Math.random() * 50 + 30);
      }
    }
    
    // Start typing when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeEffect, 500);
          observer.disconnect();
        }
      });
    });
    
    observer.observe(typewriterElement);
  }
  
  // Animation for terminal effect elements
  const terminalElements = document.querySelectorAll('.terminal-body:not(#typewriter-text)');
  terminalElements.forEach(terminal => {
    const originalText = terminal.textContent;
    terminal.textContent = '';
    
    let i = 0;
    function typeWriter() {
      if (i < originalText.length) {
        terminal.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 50 + 20);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        terminal.appendChild(cursor);
      }
    }
    
    typeWriter();
  });
  
  // Create matrix code animation
  const matrixCode = document.querySelector('.matrix-code');
  if (matrixCode) {
    const characterSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const columnCount = Math.floor(matrixCode.offsetWidth / 20);
    
    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'code-column';
      column.style.left = `${(i * 100) / columnCount}%`;
      column.style.animationDuration = `${Math.random() * 10 + 10}s`;
      column.style.animationDelay = `${Math.random() * 5}s`;
      
      const columnHeight = Math.floor(Math.random() * 20 + 10);
      for (let j = 0; j < columnHeight; j++) {
        const character = document.createElement('div');
        character.textContent = characterSet.charAt(Math.floor(Math.random() * characterSet.length));
        character.style.opacity = j === 0 ? '1' : `${1 - (j / columnHeight)}`;
        character.style.animationDelay = `${j * 0.1}s`;
        column.appendChild(character);
      }
      
      matrixCode.appendChild(column);
    }
  }
  
  // Create binary animation for footer
  const binaryOverlay = document.querySelector('.binary-overlay');
  if (binaryOverlay) {
    const maxStrings = 20;
    for (let i = 0; i < maxStrings; i++) {
      const binaryString = document.createElement('div');
      binaryString.className = 'binary-string';
      
      // Random binary string
      let string = '';
      const length = Math.floor(Math.random() * 20) + 10;
      for (let j = 0; j < length; j++) {
        string += Math.round(Math.random());
      }
      binaryString.textContent = string;
      
      // Random position and animation
      binaryString.style.left = `${Math.random() * 100}%`;
      binaryString.style.opacity = `${Math.random() * 0.5 + 0.1}`;
      binaryString.style.animationDuration = `${Math.random() * 10 + 5}s`;
      binaryString.style.animationDelay = `${Math.random() * 5}s`;
      
      binaryOverlay.appendChild(binaryString);
    }
  }
  
  // Create data points for skills animation
  const skillsAnimation = document.querySelector('.skills-animation');
  if (skillsAnimation) {
    function createDataPoint() {
      const progressBars = skillsAnimation.querySelectorAll('.progress-bar');
      if (progressBars.length === 0) return;
      
      const randomBar = progressBars[Math.floor(Math.random() * progressBars.length)];
      const dataPoint = document.createElement('div');
      dataPoint.className = 'data-point';
      
      const percentValue = parseInt(randomBar.style.width || '0%');
      const positionX = Math.min(percentValue, 100) + '%';
      
      dataPoint.style.left = positionX;
      randomBar.parentNode.appendChild(dataPoint);
      
      setTimeout(() => {
        if (dataPoint.parentNode) {
          dataPoint.parentNode.removeChild(dataPoint);
        }
      }, 2000);
    }
    
    setInterval(createDataPoint, 500);
    
    // Trigger data-flow animation on scroll
    const progressWrappers = document.querySelectorAll('.progress-bar-wrap');
    function triggerAnimation(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('data-flow');
          setTimeout(() => {
            entry.target.classList.remove('data-flow');
          }, 2000);
        }
      });
    }
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(triggerAnimation, {
        threshold: 0.5
      });
      
      progressWrappers.forEach(wrapper => {
        observer.observe(wrapper);
      });
    }
  }
});

/**
 * Creates animated circuit patterns in section backgrounds
 */
function initCircuitAnimations() {
  const techSections = document.querySelectorAll('.section');
  
  techSections.forEach(section => {
    // Don't add to hero section which already has particles
    if (section.id === 'hero') return;
    
    // Check if circuit background already exists
    if (section.querySelector('.circuit-background')) return;
    
    const circuitContainer = document.createElement('div');
    circuitContainer.className = 'circuit-background';
    
    // Create fewer circuit nodes for simplicity
    const nodeCount = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement('div');
      node.className = 'circuit-node';
      
      // Random positioning
      node.style.left = `${Math.random() * 90 + 5}%`;
      node.style.top = `${Math.random() * 90 + 5}%`;
      
      // Add pulse animation with random delay
      node.style.animationDelay = `${Math.random() * 3}s`;
      
      circuitContainer.appendChild(node);
      
      // Create fewer lines
      if (i > 0 && Math.random() > 0.3) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        
        line.style.width = `${Math.random() * 80 + 30}px`;
        line.style.left = `${Math.random() * 80 + 10}%`;
        line.style.top = `${Math.random() * 80 + 10}%`;
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        circuitContainer.appendChild(line);
      }
    }
    
    // Add container to section before any other content
    section.insertBefore(circuitContainer, section.firstChild);
  });
}

/**
 * Adds tech-themed hover effects to portfolio and skill cards
 */
function initTechCardEffects() {
  // Portfolio cards glow effect - simplified
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-glow');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-glow');
    });
  });
  
  // Tech skills data flow animation
  const techCards = document.querySelectorAll('.tech-card');
  
  techCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add data flow animation
      const progressBar = this.querySelector('.progress-bar');
      
      if (progressBar) {
        progressBar.classList.add('data-flow');
        setTimeout(() => {
          progressBar.classList.remove('data-flow');
        }, 2000);
      }
    });
  });
}

/**
 * Creates terminal-like typing effects in the About and Resume sections
 */
function initTerminalEffects() {
  // Create terminal header for About section description
  const aboutContent = document.querySelector('.about .content p.py-3:last-child');
  
  if (aboutContent && !document.querySelector('.terminal-container')) {
    // Create terminal container
    const terminalContainer = document.createElement('div');
    terminalContainer.className = 'terminal-container';
    
    // Create terminal header with buttons
    const terminalHeader = document.createElement('div');
    terminalHeader.className = 'terminal-header';
    terminalHeader.innerHTML = `
      <div class="terminal-buttons">
        <span class="term-btn close"></span>
        <span class="term-btn minimize"></span>
        <span class="term-btn maximize"></span>
      </div>
      <div class="terminal-title">about.md</div>
    `;
    
    // Create terminal body
    const terminalBody = document.createElement('div');
    terminalBody.className = 'terminal-body';
    
    // Move the content to terminal body
    const contentText = aboutContent.textContent.trim();
    aboutContent.textContent = '';
    
    // Add cursor and prepare for typing effect
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '';
    
    terminalBody.appendChild(cursor);
    
    // Add terminal structure to page
    terminalContainer.appendChild(terminalHeader);
    terminalContainer.appendChild(terminalBody);
    
    // Replace original content with terminal
    aboutContent.parentNode.replaceChild(terminalContainer, aboutContent);
    
    // Simplified typing effect (fewer characters for better performance)
    let displayText = '';
    const maxChars = Math.min(contentText.length, 250); // Limit to 250 chars
    const increment = Math.ceil(contentText.length / 250);
    
    function typeText() {
      if (displayText.length < maxChars) {
        // Add a chunk of text instead of character by character
        const nextChunk = contentText.substring(displayText.length, displayText.length + increment);
        displayText += nextChunk;
        
        if (terminalBody.firstChild === cursor) {
          terminalBody.insertBefore(document.createTextNode(displayText), cursor);
        } else {
          terminalBody.firstChild.textContent = displayText;
        }
        
        setTimeout(typeText, 30);
      }
    }
    
    // Start typing when in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeText, 500);
          observer.disconnect();
        }
      });
    });
    
    observer.observe(terminalContainer);
  }
  
  // Add command-line style to resume items (without dollar sign)
  const resumeItems = document.querySelectorAll('.resume-item ul li');
  
  resumeItems.forEach(item => {
    // Check if item already has the command prefix
    if (!item.querySelector('.cmd-prefix')) {
      const text = item.innerHTML;
      item.innerHTML = '<span class="cmd-prefix"></span>' + text;
    }
  });
}

/**
 * Creates data visualization animations for the skills section
 */
function initDataVisuals() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    // Only add data points if they don't already exist
    if (bar.querySelector('.data-point')) return;
    
    // Add data points along the progress bar (fewer for better performance)
    const value = bar.getAttribute('aria-valuenow');
    const dataPoints = Math.min(Math.floor(value / 20), 4); // Maximum 4 points
    
    for (let i = 1; i <= dataPoints; i++) {
      const dataPoint = document.createElement('span');
      dataPoint.className = 'data-point';
      dataPoint.style.left = `${i * 20}%`;
      dataPoint.style.animationDelay = `${i * 0.2}s`;
      
      bar.appendChild(dataPoint);
    }
  });
}

/**
 * Adds binary code animation to the footer
 */
function initBinaryAnimation() {
  const footer = document.querySelector('.footer');
  
  if (footer && !footer.querySelector('.binary-overlay')) {
    const binaryOverlay = document.createElement('div');
    binaryOverlay.className = 'binary-overlay';
    
    // Create fewer binary strings for performance
    for (let i = 0; i < 5; i++) {
      const binaryString = document.createElement('div');
      binaryString.className = 'binary-string';
      
      // Random position and animation speed
      binaryString.style.left = `${Math.random() * 100}%`;
      binaryString.style.animationDuration = `${Math.random() * 20 + 10}s`;
      binaryString.style.opacity = Math.random() * 0.3 + 0.1;
      
      // Generate binary content
      let content = '';
      const length = Math.floor(Math.random() * 10) + 5;
      
      for (let j = 0; j < length; j++) {
        content += Math.round(Math.random());
      }
      
      binaryString.textContent = content;
      binaryOverlay.appendChild(binaryString);
    }
    
    footer.appendChild(binaryOverlay);
  }
}

/**
 * Creates Matrix-style code rain animation in the resume section
 */
function initMatrixCode() {
  const matrixContainer = document.querySelector('.matrix-code');
  
  if (!matrixContainer) return;
  // Check if matrix already has children
  if (matrixContainer.children.length > 0) return;
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}';
  const columnCount = 8; // Fewer columns for performance
  
  // Create matrix columns
  for (let i = 0; i < columnCount; i++) {
    const column = document.createElement('div');
    column.className = 'code-column';
    
    // Random position and speed
    column.style.left = `${Math.random() * 100}%`;
    column.style.animationDuration = `${Math.random() * 20 + 10}s`;
    column.style.opacity = Math.random() * 0.2 + 0.1;
    
    // Generate random character string
    let content = '';
    const length = Math.floor(Math.random() * 8) + 5;
    
    for (let j = 0; j < length; j++) {
      content += characters.charAt(Math.floor(Math.random() * characters.length));
      if (j < length - 1) content += '<br>';
    }
    
    column.innerHTML = content;
    matrixContainer.appendChild(column);
  }
}

/**
 * Initializes dark mode toggle functionality
 */
function initDarkModeToggle() {
  // Create the toggle button if it doesn't exist
  if (!document.querySelector('.dark-mode-toggle')) {
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
      <div class="toggle-switch">
        <input type="checkbox" id="darkModeSwitch" class="toggle-input">
        <label for="darkModeSwitch" class="toggle-label">
          <i class="bi bi-sun-fill light-icon"></i>
          <i class="bi bi-moon-fill dark-icon"></i>
          <span class="toggle-slider"></span>
        </label>
      </div>
    `;
    
    // Add toggle to the document
    const header = document.querySelector('#header');
    if (header) {
      header.insertBefore(darkModeToggle, header.querySelector('.social-links'));
    }
  }
  
  // Check for saved preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Set initial state
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeSwitch').checked = true;
  }
  
  // Handle toggle click
  document.getElementById('darkModeSwitch').addEventListener('change', function() {
    if (this.checked) {
      // Enable dark mode
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      // Disable dark mode
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  });
} 