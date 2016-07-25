    Template.template = Template.fromString(`
    <!-- main content start -->
    <section id="container">
        <header class="header white-bg">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>

              <!--logo start-->
              <a href="index.html" class="logo">森林<span>天使</span></a>
              <!--logo end-->
              <div class="horizontal-menu navbar-collapse collapse ">
                  <ul class="nav navbar-nav">
                      <li class="{{isActiveRoute 'index'}}"><a href="/">首页</a></li>
                      <li class="{{isActiveRoute 'love'}}"><a href="/profile/love">爱心地图</a></li>
                      <li class="{{isActiveRoute 'need'}}"><a href="/profile/need">需要我们</a></li>
                      {{#if currentUser}}
                      <li class="{{isActiveRoute 'school'}}"><a href="/school">申请救助</a></li>
                      {{/if}}
                      {{#if currentUser}}
                        <li><a href="/logout"> 退出 </a></li>
                        <li><a>{{currentUser.emails.[0].address}}</a></li>
                        {{else}}
                        
                        {{/if}}
                      
                  </ul>

              </div>
              <div class="top-nav pull-right">
                    
              </div>

          </div>

      </header>

        <section id="main-content">
            
              {{> Template.dynamic template=content}}
        </section>
    </section>
    <!-- main content end -->

    `);
    Template.template.helpers({
        // caption() {
        //     return Session.get('caption')?`<header class="panel-heading">${Session.get('caption')}</header>`:'';
        // }
    });
