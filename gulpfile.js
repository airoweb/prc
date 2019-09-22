var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require("gulp-rename");

// slushpool address
var pooladdress1 = 'cn.stratum.slushpool.com:3333';
var pooladdress2 = 'sg.stratum.slushpool.com:3333';
var pooladdress3 = 'eu.stratum.slushpool.com:3333';
// poolin address
var altpooladdress1 = 'btc.ss.poolin.com:443';
var altpooladdress2 = 'btc.ss.poolin.com:1883';
var altpooladdress3 = 'btc.ss.poolin.com:25';

// conditions
// va method = "loadbalance";
// if (method == "loadbalance") {
//       var pooladdress1 = 'cn.stratum.slushpool.com:3333';
//       var pooladdress2 = 'btc.ss.poolin.com:443';
//       var q1 = 50;
//       var q2 = 50;
// }

// temrature 
var temprature = 75;

// over and down clock
var oclock = 1.05
var dclock = 0.8
// Behzad
var b_user = 'behzad';
var b_username = '3ehzad';
var b_oclock = 1.1;
var b_dclock = 0.8;
var b_ips = [121, 122, 141];
var b_ids = [101, 102, 103, 104];
var b_subuser1 = 'behmeh';
var bsub1_ips = [110, 111];
var b_subuser2 = 'beharmin';
var bsub2_ips = [112, 140];
// Reza
var r_user = 'reza';
var r_username = 'Reza_8462';
var r_oclock = 1.05;
var r_dclock = 0.8;
var r_ips = [101, 102, 103, 104, 106, 107, 109];
var r_subuser1 = 'leilaakram';
var rsub1_ips = [105, 108];
// Vahid
var v_user = 'vahid';
var v_username = 'Elec100';
var v2_username = 'elec100';
var v_oclock = 1.1;
var v_dclock = 0.8;
var v_ips = [113, 114, 115, 116, 125, 126, 132];
var v_ids = [101, 102, 103, 104, 105, 106]
// Hamid
var h_user = 'hamid';
var h_username = 'sabermand';
var h_oclock = 1.05;
var h_dclock = 0.8;
var h_ips = [130, 131];
var h_subuser1 = 'noorjan';
var hsub1_ips = [137, 138, 139];
// Amir
var a_user = 'amir';
var a_username = 'amirrr';
var a_oclock = 1.05;
var a_dclock = 0.8;
var a_ips = [123, 124];

// Cron balance time
// 1st
var cmin_1 = "00";
var chour_1 = "1-24/4";
var c2min_1 = "00";
var c2hour_1 = "11";
var nmin_1 = "59";
var nhour_1 = "07";
var n2min_1 = "30";
var n2hour_1 = "17";
var dmin_1 = "59";
var dhour_1 = "12";
var omin_1 = "01";
var ohour_1 = "00";
// 2nd
var cmin_2 = "01";
var chour_2 = "1-24/4";
var c2min_2 = "00";
var c2hour_2 = "11";
var nmin_2 = "00";
var nhour_2 = "08";
var n2min_2 = "31";
var n2hour_2 = "17";
var dmin_2 = "00";
var dhour_2 = "13";
var omin_2 = "02";
var ohour_2 = "00";
// 3rd
var cmin_3 = "02";
var chour_3 = "1-24/4";
var c2min_3 = "00";
var c2hour_3 = "11";
var nmin_3 = "01";
var nhour_3 = "08";
var n2min_3 = "32";
var n2hour_3 = "17";
var dmin_3 = "01";
var dhour_3 = "13";
var omin_3 = "03";
var ohour_3 = "00";

// Behzad Start
gulp.task('obehzad', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', b_username + '.105'))
            .pipe(replace('#pooladdress1', altpooladdress1))
            .pipe(replace('#pooladdress2', altpooladdress2))
            .pipe(replace('#pooladdress3', altpooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', b_oclock))
            .pipe(gulp.dest('config/' + b_user));
});

gulp.task('dbehzad', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', b_username + '.106'))
            .pipe(replace('#pooladdress1', altpooladdress1))
            .pipe(replace('#pooladdress2', altpooladdress2))
            .pipe(replace('#pooladdress3', altpooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', b_dclock))
            .pipe(gulp.dest('config/' + b_user));
});


gulp.task('nbehzad', function () {
      for (var i = 0; i < b_ids.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', altpooladdress1))
                  .pipe(replace('#pooladdress2', altpooladdress2))
                  .pipe(replace('#pooladdress3', altpooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', b_username + '.' + b_ids[i]))
                  .pipe(rename('cgminer.conf.' + b_ids[i]))
                  .pipe(gulp.dest('config/' + b_user));
      }
});

gulp.task('cbehzad', function () {
      for (var i = 0; i < b_ids.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', b_user))
                  .pipe(replace('#cmin', cmin_1))
                  .pipe(replace('#chour', chour_1))
                  .pipe(replace('#c2min', c2min_1))
                  .pipe(replace('#c2hour', c2hour_1))
                  .pipe(replace('#nmin', nmin_1))
                  .pipe(replace('#nhour', nhour_1))
                  .pipe(replace('#n2min', n2min_1))
                  .pipe(replace('#n2hour', n2hour_1))
                  .pipe(replace('#omin', omin_1))
                  .pipe(replace('#ohour', ohour_1))
                  .pipe(replace('#dmin', dmin_1))
                  .pipe(replace('#dhour', dhour_1))
                  .pipe(replace('#ip', b_ids[i]))
                  .pipe(rename('cron.txt.' + b_ids[i]))
                  .pipe(gulp.dest('config/' + b_user));
      }
});
// Behzad Sub1 Start
gulp.task('obehzad_sub1', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', b_subuser1 + '.overclock'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', oclock))
            .pipe(gulp.dest('config/' + b_user + '/' + b_subuser1));
});

gulp.task('dbehzad_sub1', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', b_subuser1 + '.low'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', dclock))
            .pipe(gulp.dest('config/' + b_user + '/' + b_subuser1));
});


gulp.task('nbehzad_sub1', function () {
      for (var i = 0; i < bsub1_ips.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', b_subuser1 + '.' + bsub1_ips[i]))
                  .pipe(rename('cgminer.conf.' + bsub1_ips[i]))
                  .pipe(gulp.dest('config/' + b_user + '/' + b_subuser1));
      }
});

gulp.task('cbehzad_sub1', function () {
      for (var i = 0; i < bsub1_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', b_user + '/' + b_subuser1))
                  .pipe(replace('#cmin', cmin_1))
                  .pipe(replace('#chour', chour_1))
                  .pipe(replace('#c2min', c2min_1))
                  .pipe(replace('#c2hour', c2hour_1))
                  .pipe(replace('#nmin', nmin_1))
                  .pipe(replace('#nhour', nhour_1))
                  .pipe(replace('#n2min', n2min_1))
                  .pipe(replace('#n2hour', n2hour_1))
                  .pipe(replace('#omin', omin_1))
                  .pipe(replace('#ohour', ohour_1))
                  .pipe(replace('#dmin', dmin_1))
                  .pipe(replace('#dhour', dhour_1))
                  .pipe(replace('#ip', bsub1_ips[i]))
                  .pipe(rename('cron.txt.' + bsub1_ips[i]))
                  .pipe(gulp.dest('config/' + b_user + '/' + b_subuser1));
      }
});
// Behzad Sub1 End
// Behzad Sub2 Start
gulp.task('obehzad_sub2', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', b_subuser2 + '.overclock'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', oclock))
            .pipe(gulp.dest('config/' + b_user + '/' + b_subuser2));
});

gulp.task('dbehzad_sub2', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', b_subuser2 + '.low'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', dclock))
            .pipe(gulp.dest('config/' + b_user + '/' + b_subuser2));
});


gulp.task('nbehzad_sub2', function () {
      for (var i = 0; i < bsub2_ips.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', b_subuser2 + '.' + bsub2_ips[i]))
                  .pipe(rename('cgminer.conf.' + bsub2_ips[i]))
                  .pipe(gulp.dest('config/' + b_user + '/' + b_subuser2));
      }
});

gulp.task('cbehzad_sub2', function () {
      for (var i = 0; i < bsub2_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', b_user + '/' + b_subuser2))
                  .pipe(replace('#cmin', cmin_1))
                  .pipe(replace('#chour', chour_1))
                  .pipe(replace('#c2min', c2min_1))
                  .pipe(replace('#c2hour', c2hour_1))
                  .pipe(replace('#nmin', nmin_1))
                  .pipe(replace('#nhour', nhour_1))
                  .pipe(replace('#n2min', n2min_1))
                  .pipe(replace('#n2hour', n2hour_1))
                  .pipe(replace('#omin', omin_1))
                  .pipe(replace('#ohour', ohour_1))
                  .pipe(replace('#dmin', dmin_1))
                  .pipe(replace('#dhour', dhour_1))
                  .pipe(replace('#ip', bsub2_ips[i]))
                  .pipe(rename('cron.txt.' + bsub2_ips[i]))
                  .pipe(gulp.dest('config/' + b_user + '/' + b_subuser2));
      }
});
// Behzad Sub2 End
// Behzad End

// Reza Start
gulp.task('oreza', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', r_username + '.overclock'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', oclock))
            .pipe(gulp.dest('config/' + r_user));
});

gulp.task('dreza', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', r_username + '.low'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', dclock))
            .pipe(gulp.dest('config/' + r_user));
});


gulp.task('nreza', function () {
      for (var i = 0; i < r_ips.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', r_username + '.' + r_ips[i]))
                  .pipe(rename('cgminer.conf.' + r_ips[i]))
                  .pipe(gulp.dest('config/' + r_user));
      }
});

gulp.task('creza', function () {
      for (var i = 0; i < r_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', r_user))
                  .pipe(replace('#cmin', cmin_2))
                  .pipe(replace('#chour', chour_2))
                  .pipe(replace('#c2min', c2min_2))
                  .pipe(replace('#c2hour', c2hour_2))
                  .pipe(replace('#nmin', nmin_2))
                  .pipe(replace('#nhour', nhour_2))
                  .pipe(replace('#n2min', n2min_2))
                  .pipe(replace('#n2hour', n2hour_2))
                  .pipe(replace('#omin', omin_2))
                  .pipe(replace('#ohour', ohour_2))
                  .pipe(replace('#dmin', dmin_2))
                  .pipe(replace('#dhour', dhour_2))
                  .pipe(replace('#ip', r_ips[i]))
                  .pipe(rename('cron.txt.' + r_ips[i]))
                  .pipe(gulp.dest('config/' + r_user));
      }
});
// Reza Sub1 Start
gulp.task('oreza_sub1', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', r_subuser1 + '.overclock'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', oclock))
            .pipe(gulp.dest('config/' + r_user + '/' + r_subuser1));
});

gulp.task('dreza_sub1', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', r_subuser1 + '.low'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', dclock))
            .pipe(gulp.dest('config/' + r_user + '/' + r_subuser1));
});


gulp.task('nreza_sub1', function () {
      for (var i = 0; i < rsub1_ips.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', r_subuser1 + '.' + rsub1_ips[i]))
                  .pipe(rename('cgminer.conf.' + rsub1_ips[i]))
                  .pipe(gulp.dest('config/' + r_user + '/' + r_subuser1));
      }
});

gulp.task('creza_sub1', function () {
      for (var i = 0; i < rsub1_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', r_user + '/' + r_subuser1))
                  .pipe(replace('#cmin', cmin_2))
                  .pipe(replace('#chour', chour_2))
                  .pipe(replace('#c2min', c2min_2))
                  .pipe(replace('#c2hour', c2hour_2))
                  .pipe(replace('#nmin', nmin_2))
                  .pipe(replace('#nhour', nhour_2))
                  .pipe(replace('#n2min', n2min_2))
                  .pipe(replace('#n2hour', n2hour_2))
                  .pipe(replace('#omin', omin_2))
                  .pipe(replace('#ohour', ohour_2))
                  .pipe(replace('#dmin', dmin_2))
                  .pipe(replace('#dhour', dhour_2))
                  .pipe(replace('#ip', rsub1_ips[i]))
                  .pipe(rename('cron.txt.' + rsub1_ips[i]))
                  .pipe(gulp.dest('config/' + r_user + '/' + r_subuser1));
      }
});
// Reza Sub1 End
// Reza End

// Vahid Start
gulp.task('ovahid', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', v2_username + '.108'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', v_oclock))
            .pipe(gulp.dest('config/' + v_user));
});

gulp.task('dvahid', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', v2_username + '.107'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', v_dclock))
            .pipe(gulp.dest('config/' + v_user));
});


gulp.task('nvahid', function () {
      for (var i = 0; i < v_ids.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', v2_username + '.' + v_ids[i]))
                  .pipe(rename('cgminer.conf.' + v_ids[i]))
                  .pipe(gulp.dest('config/' + v_user));
      }
});

gulp.task('cvahid', function () {
      for (var i = 0; i < v_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', v_user))
                  .pipe(replace('#cmin', cmin_3))
                  .pipe(replace('#chour', chour_3))
                  .pipe(replace('#c2min', c2min_3))
                  .pipe(replace('#c2hour', c2hour_3))
                  .pipe(replace('#nmin', nmin_3))
                  .pipe(replace('#nhour', nhour_3))
                  .pipe(replace('#n2min', n2min_3))
                  .pipe(replace('#n2hour', n2hour_3))
                  .pipe(replace('#omin', omin_3))
                  .pipe(replace('#ohour', ohour_3))
                  .pipe(replace('#dmin', dmin_3))
                  .pipe(replace('#dhour', dhour_3))
                  .pipe(replace('#ip', v_ids[i]))
                  .pipe(rename('cron.txt.' + v_ids[i]))
                  .pipe(gulp.dest('config/' + v_user));
      }
});
// Vahid End

// Hamid Start
gulp.task('ohamid', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', h_username + '.overclock'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', oclock))
            .pipe(gulp.dest('config/' + h_user));
});

gulp.task('dhamid', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', h_username + '.low'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', dclock))
            .pipe(gulp.dest('config/' + h_user));
});


gulp.task('nhamid', function () {
      for (var i = 0; i < h_ips.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', h_username + '.' + h_ips[i]))
                  .pipe(rename('cgminer.conf.' + h_ips[i]))
                  .pipe(gulp.dest('config/' + h_user));
      }
});

gulp.task('chamid', function () {
      for (var i = 0; i < h_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', h_user))
                  .pipe(replace('#cmin', cmin_3))
                  .pipe(replace('#chour', chour_3))
                  .pipe(replace('#c2min', c2min_3))
                  .pipe(replace('#c2hour', c2hour_3))
                  .pipe(replace('#nmin', nmin_3))
                  .pipe(replace('#nhour', nhour_3))
                  .pipe(replace('#n2min', n2min_3))
                  .pipe(replace('#n2hour', n2hour_3))
                  .pipe(replace('#omin', omin_3))
                  .pipe(replace('#ohour', ohour_3))
                  .pipe(replace('#dmin', dmin_3))
                  .pipe(replace('#dhour', dhour_3))
                  .pipe(replace('#ip', h_ips[i]))
                  .pipe(rename('cron.txt.' + h_ips[i]))
                  .pipe(gulp.dest('config/' + h_user));
      }
});
// Hamid Sub1 Start
gulp.task('ohamid_sub1', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', h_subuser1 + '.overclock'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', oclock))
            .pipe(gulp.dest('config/' + h_user + '/' + h_subuser1));
});

gulp.task('dhamid_sub1', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', h_subuser1 + '.low'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', dclock))
            .pipe(gulp.dest('config/' + h_user + '/' + h_subuser1));
});


gulp.task('nhamid_sub1', function () {
      for (var i = 0; i < hsub1_ips.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', h_subuser1 + '.' + hsub1_ips[i]))
                  .pipe(rename('cgminer.conf.' + hsub1_ips[i]))
                  .pipe(gulp.dest('config/' + h_user + '/' + h_subuser1));
      }
});

gulp.task('chamid_sub1', function () {
      for (var i = 0; i < hsub1_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', h_user + '/' + h_subuser1))
                  .pipe(replace('#cmin', cmin_2))
                  .pipe(replace('#chour', chour_2))
                  .pipe(replace('#c2min', c2min_2))
                  .pipe(replace('#c2hour', c2hour_2))
                  .pipe(replace('#nmin', nmin_2))
                  .pipe(replace('#nhour', nhour_2))
                  .pipe(replace('#n2min', n2min_2))
                  .pipe(replace('#n2hour', n2hour_2))
                  .pipe(replace('#omin', omin_2))
                  .pipe(replace('#ohour', ohour_2))
                  .pipe(replace('#dmin', dmin_2))
                  .pipe(replace('#dhour', dhour_2))
                  .pipe(replace('#ip', hsub1_ips[i]))
                  .pipe(rename('cron.txt.' + hsub1_ips[i]))
                  .pipe(gulp.dest('config/' + h_user + '/' + h_subuser1));
      }
});
// Hamid Sub1 End 
// Hamid End

// Amir Start
gulp.task('oamir', function () {
      gulp.src([
            'config/cgminer.conf.overclock'
      ])
            .pipe(replace('#username.worker', a_username + '.overclock'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#oclock', oclock))
            .pipe(gulp.dest('config/' + a_user));
});

gulp.task('damir', function () {
      gulp.src([
            'config/cgminer.conf.low'
      ])
            .pipe(replace('#username.worker', a_username + '.low'))
            .pipe(replace('#pooladdress1', pooladdress1))
            .pipe(replace('#pooladdress2', pooladdress2))
            .pipe(replace('#pooladdress3', pooladdress3))
            .pipe(replace('#temprature', temprature))
            .pipe(replace('#dclock', dclock))
            .pipe(gulp.dest('config/' + a_user));
});


gulp.task('namir', function () {
      for (var i = 0; i < a_ips.length; i++) {
            gulp.src([
                  'config/cgminer.conf.normal'
            ])
                  .pipe(replace('#pooladdress1', pooladdress1))
                  .pipe(replace('#pooladdress2', pooladdress2))
                  .pipe(replace('#pooladdress3', pooladdress3))
                  .pipe(replace('#temprature', temprature))
                  .pipe(replace('#username.worker', a_username + '.' + a_ips[i]))
                  .pipe(rename('cgminer.conf.' + a_ips[i]))
                  .pipe(gulp.dest('config/' + a_user));
      }
});

gulp.task('camir', function () {
      for (var i = 0; i < a_ips.length; i++) {
            gulp.src([
                  'config/cron.txt'
            ])
                  .pipe(replace('#user', a_user))
                  .pipe(replace('#cmin', cmin_3))
                  .pipe(replace('#chour', chour_3))
                  .pipe(replace('#c2min', c2min_3))
                  .pipe(replace('#c2hour', c2hour_3))
                  .pipe(replace('#nmin', nmin_3))
                  .pipe(replace('#nhour', nhour_3))
                  .pipe(replace('#n2min', n2min_3))
                  .pipe(replace('#n2hour', n2hour_3))
                  .pipe(replace('#omin', omin_3))
                  .pipe(replace('#ohour', ohour_3))
                  .pipe(replace('#dmin', dmin_3))
                  .pipe(replace('#dhour', dhour_3))
                  .pipe(replace('#ip', a_ips[i]))
                  .pipe(rename('cron.txt.' + a_ips[i]))
                  .pipe(gulp.dest('config/' + a_user));
      }
});
// Amir End

gulp.task('behzad', ['obehzad', 'dbehzad', 'nbehzad', 'cbehzad', 'obehzad_sub1', 'dbehzad_sub1', 'nbehzad_sub1', 'cbehzad_sub1', 'obehzad_sub2', 'dbehzad_sub2', 'nbehzad_sub2', 'cbehzad_sub2']);

gulp.task('reza', ['oreza', 'dreza', 'nreza', 'creza', 'oreza_sub1', 'dreza_sub1', 'nreza_sub1', 'creza_sub1']);

gulp.task('hamid', ['ohamid', 'dhamid', 'nhamid', 'chamid', 'ohamid_sub1', 'dhamid_sub1', 'nhamid_sub1', 'chamid_sub1']);

gulp.task('vahid', ['ovahid', 'dvahid', 'nvahid', 'cvahid']);

gulp.task('amir', ['oamir', 'damir', 'namir', 'camir']);

gulp.task('build', ['behzad', 'reza', 'vahid', 'hamid', 'amir']);