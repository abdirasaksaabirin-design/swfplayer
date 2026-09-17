/**
 * swfPlayer.js - Legacy ActiveX embed wrapper for SWF files
 */
(function (window) {
  class SWFPlayer {
    /**
     * @param {string|HTMLElement} container - The DOM element or selector to put the player in.
     * @param {Object} options - Configuration options for player width and height.
     */
    constructor(container, options = {}) {
      this.container = typeof container === "string" ? document.querySelector(container) : container;
      this.width = options.width || "800";
      this.height = options.height || "600";
    }

    /**
     * Loads an SWF file using legacy ActiveX controls
     * @param {string} swfUrl - Relative or absolute path to the .swf file
     */
    load(swfUrl) {
      if (!this.container) {
        console.error("SWFPlayer: Invalid container provided.");
        return;
      }

      // Format dimensions
      const w = typeof this.width === "number" ? `${this.width}px` : this.width;
      const h = typeof this.height === "number" ? `${this.height}px` : this.height;

      // Construct ActiveX <object> markup
      this.container.innerHTML = `
        <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" 
                width="${w}" 
                height="${h}" 
                id="flashPlayerObject">
          <param name="movie" value="${swfUrl}" />
          <param name="quality" value="high" />
          <param name="bgcolor" value="#ffffff" />
          <param name="allowScriptAccess" value="always" />
          <param name="wmode" value="window" />
          <!-- Fallback for legacy non-ActiveX browsers -->
          <embed src="${swfUrl}" 
                 quality="high" 
                 bgcolor="#ffffff" 
                 width="${w}" 
                 height="${h}" 
                 name="flashPlayerObject" 
                 align="middle" 
                 allowScriptAccess="always" 
                 type="application/x-shockwave-flash" 
                 pluginspage="http://www.macromedia.com/go/getflashplayer">
          </embed>
        </object>
      `;
    }

    /**
     * Clears the player container
     */
    destroy() {
      if (this.container) {
        this.container.innerHTML = "";
      }
    }
  }

  // Export to global window context
  window.SWFPlayer = SWFPlayer;
})(window);