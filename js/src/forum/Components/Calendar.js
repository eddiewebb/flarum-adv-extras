import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Component  from 'flarum/Component';
import Page from 'flarum/components/Page';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import IndexPage from 'flarum/components/IndexPage';
import SelectDropdown from 'flarum/components/SelectDropdown';
import LinkButton from 'flarum/components/LinkButton';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import EventDetailsModal from "./EventDetailsModal";


export default class CalendarComponent extends Page {
    init() {
        super.init();

        // THIS NEEDS TO EXPORTED to frontend
        /*document.addEventListener('DOMContentLoaded', function() {
          const calendarEl = document.getElementById('calendar');
          console.log({"message":"Calendar div found","object":calendarEl});
          const calendar = new Calendar(calendarEl, {
            plugins: [ dayGridPlugin ]
          });

          calendar.render();
        });*/
	  }

    onunload() {
    }

    view() {
        return (
        	<div className="IndexPage">
                {IndexPage.prototype.hero()}
                <div className="container">
                    <div className="sideNavContainer">
                        <nav className="IndexPage-nav sideNav">
                            <ul>{listItems(this.sidebarItems().toArray())}</ul>
                        </nav>
                        <div className="IndexPage-results sideNavOffset">
                            <div className="IndexPage-toolbar">
                            </div>
                            <div id="calendar">here</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

        /**
     * Build an item list for the sidebar of the index page. By default this is a
     * "New Discussion" button, and then a DropdownSelect component containing a
     * list of navigation items.
     *
     * @return {ItemList}
     */
    sidebarItems() {
        const items = IndexPage.prototype.sidebarItems();

        items.replace('nav',
            SelectDropdown.component({
                children: this.navItems(this).toArray(),
                buttonClassName: 'Button',
                className: 'App-titleControl'
            })
        );

        return items;
    }

    /**
     * Build an item list for the navigation in the sidebar of the index page. By
     * default this is just the 'All Discussions' link.
     *
     * @return {ItemList}
     */
    navItems() {
        const items = IndexPage.prototype.navItems();

       /* items.add('fof-user-directory',
            LinkButton.component({
                href: app.route('advevents'),
                children: "View a new events",
                icon: 'far fa-address-book'
            }),
            85
        );*/

        return items;
    }
  /**
     * Build an item list for the part of the toolbar which is concerned with how
     * the results are displayed. By default this is just a select box to change
     * the way discussions are sorted.
     *
     * @return {ItemList}
     */
    viewItems() {

    }

    config(isInitialized, context) {

        const calendarEl = document.getElementById('calendar');
        let userRecords;

        const calendar = new Calendar(calendarEl,{
          headerToolbar: { center: 'dayGridMonth,listYear' }, // buttons for switching between views
          initialView: 'dayGridMonth',
          plugins: [ dayGridPlugin, interactionPlugin, listPlugin ],
          eventClick: function(info) {
            // alert(
            //   'Event: ' + info.event.title + '\n' +
            //   'User: ' + info.event.extendedProps.user_display + '\n'
            // );

            app.modal.show(
              new EventDetailsModal({"event":info.event})
            );

            // change the border color just for fun
            info.el.style.borderColor = 'red';
          },
          events: {
            "url": "/api/events",
            "success": function (content, xhr) {
              userRecords = content.included;
              return content.data;
            },
          },
          eventDataTransform: function(eventData){
            function userLookup(userId) {
              for (const userKey in userRecords) {
                if( userRecords[userKey].id === userId){
                  return userRecords[userKey];
                }
              }
            }

            const associatedUser = userLookup(eventData.relationships.user.data.id);
            return {
              "id":eventData.attributes.id,
              "title":eventData.attributes.name,
              "end":eventData.attributes.event_end,
              "start":eventData.attributes.event_start,
              "extendedProps":{
                "description": eventData.attributes.description,
                "user" : associatedUser,
              },
            };
          }
        });
        calendar.render();
        calendar.on('dateClick', function(info) {
          console.log('clicked on ' + info.dateStr);
        });
    }
}


