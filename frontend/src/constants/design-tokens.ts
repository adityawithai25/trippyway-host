/**
 * Design System Tokens - Single Source of Truth
 *
 * Centralized design tokens for the TrippyWay platform.
 * These tokens ensure consistency across the application for:
 * - Border radius
 * - Spacing
 * - Transitions/animations
 * - Typography
 * - Shadows (elevation)
 * - Colors (emerald brand palette)
 */

export const DESIGN_TOKENS = {
  /**
   * Border Radius Scale
   * Standardized rounding values for consistent UI elements
   */
  radius: {
    xs: '0.375rem',    // 6px - Small badges, tiny elements
    sm: '0.5rem',      // 8px - Inputs, small buttons
    md: '0.75rem',     // 12px - Standard buttons, small cards
    lg: '1rem',        // 16px - Large buttons, standard cards
    xl: '1.5rem',      // 24px - Featured cards, hero elements
    '2xl': '2rem',     // 32px - Large hero elements, modals
    full: '9999px',    // Circular - Pills, avatars, circular buttons
  },

  /**
   * Spacing Scale
   * Consistent gaps and padding throughout the application
   * Based on 4px/8px grid system
   */
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
  },

  /**
   * Transition Duration Scale
   * Unified timing for smooth, consistent animations
   */
  transition: {
    fast: '150ms',     // Quick interactions (hover states, button presses)
    normal: '250ms',   // Default transitions (most UI elements)
    slow: '350ms',     // Complex animations (modals, drawers)
  },

  /**
   * Typography Scale
   * Letter spacing (tracking) values for text hierarchy
   */
  typography: {
    tracking: {
      tight: '-0.025em',   // Tight letter spacing for headings
      normal: '0',         // Default letter spacing
      wide: '0.025em',     // Slightly wider
      wider: '0.05em',     // Wider for labels
      widest: '0.1em',     // Widest for overlines/labels
    },
  },

  /**
   * Shadow Elevation System
   * Consistent depth hierarchy for UI elements
   */
  shadow: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',              // Subtle shadow for inputs
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1)',               // Resting cards
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',            // Hovered cards, dropdowns
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',          // Active/selected cards
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',          // Modals, elevated surfaces
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',     // Maximum elevation (hero)
  },

  /**
   * Emerald Brand Color Palette
   * Primary brand colors for the TrippyWay platform
   */
  colors: {
    emerald: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',  // Primary brand color
      900: '#064e3b',
    },
  },

  /**
   * Animation Easing Functions
   * Common easing curves for natural motion
   */
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',  // Bouncy spring effect
  },
} as const;

/**
 * Type exports for TypeScript support
 */
export type RadiusKey = keyof typeof DESIGN_TOKENS.radius;
export type SpacingKey = keyof typeof DESIGN_TOKENS.spacing;
export type TransitionKey = keyof typeof DESIGN_TOKENS.transition;
export type ShadowKey = keyof typeof DESIGN_TOKENS.shadow;
export type EmeraldShade = keyof typeof DESIGN_TOKENS.colors.emerald;

/**
 * Helper function to get design token values
 * Usage: getToken('radius', 'lg') => '1rem'
 */
export function getToken(
  category: keyof typeof DESIGN_TOKENS,
  key: string
): string {
  const tokenCategory = DESIGN_TOKENS[category] as Record<string, any>;
  return tokenCategory[key] || '';
}
