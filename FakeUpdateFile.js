// <!-- <div class="row">
//     <h2>Update Games</h2>
//      <button>Edit</button>
//       <ul>
      
//           <% league.schedule.forEach((game) => { %>
//                 <% game.forEach(pair => { %> 
                
//                   <% pair.forEach(teams => { %>
//                   <%=teams.teamName%>                       
//                   ------------
//                   <% }) %>
                 
//                   <form action="/leagues/<%=league._id%>/updateResults" method="POST">
//                     <input type="radio" id="contactChoice1" name="Team1Win" value="">
//                     <label for="contactChoice1"><%=pair[0].teamName%> Wins</label>
//                     <input type="radio" id="contactChoice2" name="Team2Win" value="">
//                     <label for="contactChoice2"><%=pair[1].teamName%> Wins</label>
//                     <input type="radio" id="contactChoice2" name="contact" value="unplayed">
//                     <label for="contactChoice2">Game Not Played</label>
//                     <button type="submit">Submit</button>
//                 </form>
//                   <% }) %>    
//           <% }) %>
//       </ul>
//     <div class="col-sm-4 campaign-info">
//       <div class="campaign-progress">
//         <progress value="<%= league.leagueName %>" max="<%= league.leagueName %>"></progress>
//       </div>
//       <div class="campaign-pledged">
//         <span class="campaign-total">Team1<%= league.leagueName %></span><br>
//         <span class="light-text">
//           pledged of
//           $<%= league.leagueName %></span> goal

//       <div class="campaign-backers">
//         <strong class="large-strong"><%= league.leagueName %></strong><br>
//         <span class="light-text">backers</span>
//       </div>

//       <div class="campaign-time">
//         <strong class="large-strong"><%= league.leagueName %></strong><br>
//         <span class="light-text"><%= league.leagueName %> to go.</span>
//       </div>

//       <a class="btn backer-btn" href="/leagues/<%=league._id%>/edit">Edit This</a>
//       <form action="/leagues/<%= league._id %>/delete" method="POST">
//         <button type="submit" class="btn backer-btn" style="background-color:red">Delete Product</button>
//       </form>
      
//     </div>
//   </div>
// </div> -->