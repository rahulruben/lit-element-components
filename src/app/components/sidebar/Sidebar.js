import { LitElement, css, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

class Sidebar extends LitElement {
    static get properties() {
        return {
            name: {
                type: String
            },
            open: {
                type: Boolean,
                value: false
            },
            headerColor: {
                type: String
            }
        };
    }
    static get styles() {
        return css`
          #sidebar { 
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              pointer-events: none;
          }
          #sidebar .sidebar__nav {
            position: relative;
            overflow: hidden;
            min-width: 300px;
            height: 100%;
            width: 20%;
            background-color: #fff;
            z-index: 101;
            transform: translateX(-100%);
            transition: transform .5s cubic-bezier(0.075, 0.82, 0.165, 1);
          }

          #sidebar .sidebar__backdrop {
            position: absolute;
            top: 0;
            z-index: 100;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            opacity: 0;
            transition: opacity .22s linear;
         }

         #sidebar.sidebar--visible {
            pointer-events: auto;
         }

         #sidebar.sidebar--visible > nav.sidebar__nav {
            transform: none;
         }
         #sidebar.sidebar--visible > .sidebar__backdrop {
            opacity: 1;
         }

         #sidebar .nav__header {
            width: 100%;
            height: 20%;
            background: pink;
            position: absolute;
            padding: .5em;
         }
       
        `;
    }

    onBackdropClick() {
        this.open = false;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div id="sidebar" class=${ifDefined(this.open ? "sidebar--visible" : "")}>
                <nav class="sidebar__nav">
                    <div class="nav__header">
                        <slot></slot>
                    </div>
                </nav>
                <div class="sidebar__backdrop" @click=${this.onBackdropClick}></div>
            </div>
        `;
    }
}

customElements.define('gn-sidebar', Sidebar);
