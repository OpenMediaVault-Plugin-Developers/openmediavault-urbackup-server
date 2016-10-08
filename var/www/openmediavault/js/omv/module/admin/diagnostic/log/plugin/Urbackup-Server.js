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
// require("js/omv/PluginManager.js")
// require("js/omv/module/admin/diagnostic/log/plugin/Plugin.js")
// require("js/omv/util/Format.js")

Ext.define("OMV.module.admin.diagnostic.log.plugin.UrbackupServer", {
    extend : "OMV.module.admin.diagnostic.log.plugin.Plugin",
    alias  : "omv.plugin.diagnostic.log.urbackup-server",

    id: "urbackup-server",
    text: _("UrBackup Server"),
    stateful: true,
    stateId: "1779c5e8-cf69-441a-8c9f-93259362f2fb",
    columns: [{
        text: _("Date & Time"),
        sortable: true,
        dataIndex: "rownum",
        stateId: "date",
        renderer: function(value, metaData, record) {
            return record.get("date");
        }
    },{
        xtype: "whitespacecolumn",
        text: _("Message"),
        sortable: true,
        dataIndex: "message",
        stateId: "message",
        flex: 1
    }],
    rpcParams: {
        id: "urbackup-server"
    },
    rpcFields: [
        { name: "rownum", type: "int" },
        { name: "ts", type: "int" },
        { name: "date", type: "string" },
        { name: "message", type: "string" }
    ]
});
