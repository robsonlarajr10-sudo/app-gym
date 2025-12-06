            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              </Button>
              {user ? (
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-orange-500/50 cursor-pointer hover:border-orange-500 transition-colors">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-600 text-white">
                      {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" onClick={handleLogout} className="text-slate-400 hover:text-white">
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleLogin('github')}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    Login GitHub
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleLogin('vercel')}
                    className="text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    Login Vercel
                  </Button>
                </div>
              )}
            </div>