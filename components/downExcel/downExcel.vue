<template>
  <div class="downExcel">
    <div class="show">
      <i @click="down" class="fa fa-file-excel-o downinfo"></i>
      <a href id="downs"></a>
    </div>
    <table class="downtable" id="downtable" style="display:none;" v-if="dataList.length>0">
      <thead>
        <tr style="text-align:center;font-weight:600;font-size:16px;">
          <template v-for="(item,index) in columns">
            <td :key="index" style="text-align:center;" v-if="!item.type">{{item.label}}</td>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr :key="cindex" v-for="(item,cindex) in dataList">
          <template v-for="(column,index) in columns">
            <td :key="index" style="text-align:center;" v-if="!column.type">
              <span>{{column.render ? column.render(item[column.prop]) :item[column.prop] |valueType(column.filterType)}}</span>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script type="text/javascript" language="javascript" >
export default {
  props: {
    columns: {
      type: Array,
    },
    dataList: {
      type: Array,
    },
    title: {
      type: String,
      default: 'title',
    },
  },
  data() {
    return {
      collength: '',
    }
  },
  methods: {
    down() {
      this.$emit('down', this.downExcl)
    },
    downExcl() {
      let title = this.title
      var idTmr
      function getExplorer() {
        var explorer = window.navigator.userAgent
        //ie
        if (explorer.indexOf('MSIE') >= 0) {
          return 'ie'
        }
        //firefox
        else if (explorer.indexOf('Firefox') >= 0) {
          return 'Firefox'
        }
        //Chrome
        else if (explorer.indexOf('Chrome') >= 0) {
          return 'Chrome'
        }
        //Opera
        else if (explorer.indexOf('Opera') >= 0) {
          return 'Opera'
        }
        //Safari
        else if (explorer.indexOf('Safari') >= 0) {
          return 'Safari'
        }
      }
      function method5(tableid) {
        tableid = 'downtable'
        if (getExplorer() == 'ie') {
          var curTbl = document.getElementById(tableid)
          var oXL = new ActiveXObject('Excel.Application')
          var oWB = oXL.Workbooks.Add()
          var xlsheet = oWB.Worksheets(1)
          var sel = document.body.createTextRange()
          sel.moveToElementText(curTbl)
          sel.select()
          sel.execCommand('Copy')
          xlsheet.Paste()
          oXL.Visible = true
          try {
            var fname = oXL.Application.GetSaveAsFilename(
              'Excel.xls',
              'Excel Spreadsheets (*.xls), *.xls'
            )
          } catch (e) {
            print('Nested catch caught ' + e)
          } finally {
            oWB.SaveAs(fname)
            oWB.Close((savechanges = false))
            oXL.Quit()
            oXL = null
            idTmr = window.setInterval('Cleanup();', 1)
          }
        } else {
          tableToExcel(tableid)
        }
      }
      function Cleanup() {
        window.clearInterval(idTmr)
        CollectGarbage()
      }
      var tableToExcel = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,'
        var template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
            <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>{worksheet}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet></x:ExcelWorksheets>
            </x:ExcelWorkbook></xml><meta charset="UTF-8"></head>
            <body><table>{table}</table></body>
            </html>`,
          base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
          },
          format = function (s, c) {
            return s.replace(/{(\w+)}/g, function (m, p) {
              return c[p]
            })
          }
        return function (table, name) {
          if (!table.nodeType) table = document.getElementById(table)
          var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
          document.getElementById('downs').href =
            uri + base64(format(template, ctx)) //必须是a标签，否则无法下载改名
          document.getElementById('downs').download = `${title}.xls`
          document.getElementById('downs').click()
        }
      })()
      method5()
    },
  },
  mounted() {
    this.collength = this.columns.length
  },
}
</script>

<style>
.downinfo {
  position: absolute;
  right: 40px;
  top: 0;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  color: #fff;
}
.downtable td {
  text-align: center;
}
</style> 


