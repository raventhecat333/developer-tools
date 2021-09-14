/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.DataGridNode}
 */
WebInspector.ShowMoreDataGridNode = function(callback, nextCount, allCount)
{
    function populate(count)
    {
        var index = this.parent.children.indexOf(this);
        this.parent.removeChild(this);
        callback(count, index);
    }

    this.showNext = document.createElement("button");
    this.showNext.setAttribute("type", "button");
    this.showNext.textContent = WebInspector.UIString("Show next %d", nextCount);
    this.showNext.addEventListener("click", populate.bind(this, nextCount), false);

    if (allCount) {
        this.showAll = document.createElement("button");
        this.showAll.setAttribute("type", "button");
        this.showAll.textContent = WebInspector.UIString("Show all %d", allCount);
        this.showAll.addEventListener("click", populate.bind(this, allCount), false);
    }

    WebInspector.DataGridNode.call(this, {summaryRow:true}, false);
    this.selectable = false;
}

WebInspector.ShowMoreDataGridNode.prototype = {
    createCells: function()
    {
        var cell = document.createElement("td");
        if (this.depth)
            cell.style.setProperty("padding-left", (this.depth * this.dataGrid.indentWidth) + "px");
        cell.appendChild(this.showNext);
        if (this.showAll)
            cell.appendChild(this.showAll);
        this._element.appendChild(cell);

        var columns = this.dataGrid.columns;
        var count = 0;
        for (var c in columns)
            ++count;
        while (--count > 0) {
            cell = document.createElement("td");
            this._element.appendChild(cell);
        }
    },

    /**
     * @override
     * @return {number}
     */
    nodeHeight: function()
    {
        return 33;
    }
};

WebInspector.ShowMoreDataGridNode.prototype.__proto__ = WebInspector.DataGridNode.prototype;
