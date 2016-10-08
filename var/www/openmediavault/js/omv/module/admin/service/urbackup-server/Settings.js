/**
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @author    OpenMediaVault Plugin Developers <plugins@omv-extras.org>
 * @copyright Copyright (c) 2009-2013 Volker Theile
 * @copyright Copyright (c) 2013-2016 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")

Ext.define("OMV.module.admin.service.urbackup-server.Settings", {
    extend : "OMV.workspace.form.Panel",

    rpcService   : "UrbackupServer",
    rpcGetMethod : "getSettings",
    rpcSetMethod : "setSettings",

    plugins      : [{
        ptype        : "linkedfields",
        correlations : [{
            name : [
                "enable"
            ],
            conditions : [{
                name  : "enable",
                value : true
            }],
            properties : function(valid, field) {
                this.setButtonDisabled("openweb", !valid);
            }
        }]
    }],

    getButtonItems : function() {
        var me = this;
        var items = me.callParent(arguments);
        items.push({
            id       : me.getId() + "-openweb",
            xtype    : "button",
            text     : _("Open Web Interface"),
            icon     : "images/network.png",
            iconCls  : Ext.baseCSSPrefix + "btn-icon-16x16",
            disabled : true,
            scope    : me,
            handler  : Ext.Function.bind(me.onOpenWebButton, me, [ me ])
        });
        return items;
    },

    getFormItems : function () {
        return [{
            xtype         : "fieldset",
            title         : _("General settings"),
            fieldDefaults : {
                labelSeparator : ""
            },
            items : [{
                xtype      : "checkbox",
                name       : "enable",
                fieldLabel : _("Enable"),
                checked    : false
            },{
                xtype         : "numberfield",
                name          : "port",
                fieldLabel    : _("Port"),
                vtype         : "port",
                minValue      : 1,
                maxValue      : 65535,
                allowDecimals : false,
                allowBlank    : false,
                value         : 55413
            },{
                xtype         : "numberfield",
                name          : "webport",
                fieldLabel    : _("Web Port"),
                vtype         : "port",
                minValue      : 1,
                maxValue      : 65535,
                allowDecimals : false,
                allowBlank    : false,
                value         : 55414
            },{
                xtype      : "combo",
                name       : "loglevel",
                fieldLabel : _("Log Level"),
                mode       : "local",
                store      : new Ext.data.SimpleStore({
                    fields  : [ "value", "text" ],
                    data    : [
                        [ "debug", _("Debug") ],
                        [ "error", _("Error") ],
                        [ "info", _("Info") ],
                        [ "warn", _("Warn") ]
                    ]
                }),
                displayField  : "text",
                valueField    : "value",
                allowBlank    : false,
                editable      : false,
                triggerAction : "all",
                value         : "warn"
            }]
        }];
    },

    onOpenWebButton : function() {
        var me = this;
        window.open("http://" + window.location.hostname + ":" + me.getForm().findField("webport").getValue(), "_blank");
    }
});

OMV.WorkspaceManager.registerPanel({
    id        : "settings",
    path      : "/service/urbackup-server",
    text      : _("Settings"),
    position  : 10,
    className : "OMV.module.admin.service.urbackup-server.Settings"
});
